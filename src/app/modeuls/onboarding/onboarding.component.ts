import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { configurationItem } from 'src/app/config/data';
import { Page } from 'src/app/entity/Page';
import { Helper } from 'src/app/helper/helper';
import { DataService } from 'src/app/service/data.service';
import { WebService } from 'src/app/service/web.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  providers: [DataService, Helper, WebService],
})
export class OnboardingComponent implements OnInit {
  navigationdata: Object = {};
  dropdownOptionsData: Object = {};
  inputOptionsData: Object = {};
  progressOption: Object = {};
  pageConfiguration: any = {};
  pageNumber: number = 0;
  dynamicInput: any;
  compiledData: any;
  taxDataStatement: any = {};

  constructor(
    private cdr: ChangeDetectorRef,
    public store: Store<AppState>,
    public storeService: DataService,
    public helper: Helper,
    public webService: WebService
  ) {}

  senData(data: String) {
    alert(data);
  }
  addCoin(name: any, price: any) {
    this.store.dispatch({
      type: 'ADD_COIN',
      payload: Object.assign({}, <Page>this.pageConfiguration),
    });
  }
  ngOnInit(): void {
    this.store
      .select((state) => state)
      .subscribe((res: any) => {
        this.helper
          .createCompiledData(res?.taxStore?.taxStore, this.compiledData)
          .then((res: any) => {
            console.log(res);
            this.compiledData = res;
            this.compiledData = this.helper.dataObject;
            // this.storeService.updateCompiledTaxData(res);
          });
        // this.storeService.updateCompiledTaxData({
        //   data: 'demo',
        // });
      });

    // this.cdr.detectChanges();

    this.pageConfiguration = configurationItem.data.data[this.pageNumber];

    this.navigationdata = {
      language: 'EN',
      title: this.pageConfiguration?.stepName || 'title',
    };
    this.dropdownOptionsData = {
      items: [
        {
          title: 'FD (5 years )',
          description: '150000',
        },
      ],
      SelectedItem: null,
      placeHolder: 'please select the list',
    };

    this.progressOption = {
      items: [
        {
          title: 'FD 5 years',
          category: '80C',
          excemption: 150000,
          actual: 30000,
          percentage: 40,
        },
        {
          title: 'PPF',
          category: '80C',
          excemption: 150000,
          actual: 30000,
          percentage: 72,
        },
      ],
    };
  }
  optionSelected(data: any): void {
    this.pageConfiguration.isValueField = true;
    this.dynamicInput = data;
    this.pageConfiguration.SelectedItem = data;
  }
  buttonSubmision(data: any): void {
    // if (this.pageNumber > 3) {
    let resultData = {};
    this.store
      .select((state) => state)
      .subscribe((res: any) => {
        console.log(res);
        resultData = {
          data: {
            ...res?.taxStore?.compiledData,
            salaryStructure: {
              grossSalary: res?.taxStore?.taxStore
                ? res?.taxStore?.taxStore[0]?.fields[0]?.actualValue
                : this.pageConfiguration?.fields[0]?.actualValue,
              basicSalary: res?.taxStore?.taxStore
                ? res?.taxStore?.taxStore[0]?.fields[1]?.actualValue
                : this.pageConfiguration?.fields[1]?.actualValue,
            },
          },
        };
        console.log(resultData);
        this.webService.calculateTax(resultData).then((res: any) => {
          console.log(res);
          this.taxDataStatement = res;
          // this.storeService.updateStore({
          //   storeData: configurationItem.data.data[this.pageNumber],
          //   selectedItem: this.pageConfiguration.SelectedItem,
          //   compiledData: {},
          //   pageActive: this.pageNumber,
          //   taxData: res,
          // });
        });
      });
    // } else {
    this.storeService.updateStore({
      storeData: configurationItem.data.data[this.pageNumber],
      selectedItem: this.pageConfiguration.SelectedItem,
      compiledData: this.compiledData,
      pageActive: this.pageNumber + 1,
      taxData: {},
    });
    this.storeService.updateCompiledTaxData(this.compiledData);
    this.pageNumber++;
    this.pageConfiguration = configurationItem.data.data[this.pageNumber];
    this.navigationdata = {
      language: 'EN',
      title: this.pageConfiguration?.stepName || 'title',
    };
    // }
    // this.storeService.updateCompiledTaxData(this.compiledData);
  }
  inputValueEmitterHandler(data: any): void {
    let index = this.pageConfiguration.tax_data.items.findIndex(
      (el: any) => el?.title == data?.title
    );

    if (index > -1) {
      this.pageConfiguration.tax_data.items[index] = data;
    } else {
      this.pageConfiguration.tax_data.items.push(data);
    }
    this.storeService.updateStore({
      storeData: configurationItem.data.data[this.pageNumber],
      selectedItem: this.pageConfiguration.SelectedItem,
      compiledData: this.compiledData,
      pageActive: this.pageNumber,
      taxData: {},
    });
  }
  editEmitterHandler(data: any): void {
    this.pageConfiguration.isValueField = false;
    this.cdr.detectChanges();
    this.pageConfiguration.SelectedItem = data;
    this.optionSelected(data);
    this.storeService.updateStore({
      storeData: configurationItem.data.data[this.pageNumber],
      selectedItem: this.pageConfiguration.SelectedItem,
      compiledData: this.compiledData,
      pageActive: this.pageNumber,
      taxData: {},
    });
    // this.store
    //   .select((state) => state)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //   });
  }
  backEmmiterHandler(data: any) {
    this.pageNumber > 0 ? this.pageNumber-- : null;
    this.pageConfiguration = configurationItem.data.data[this.pageNumber];
    this.storeService.updateStore({
      storeData: configurationItem.data.data[this.pageNumber],
      selectedItem: this.pageConfiguration.SelectedItem,
      compiledData: this.compiledData,
      pageActive: this.pageNumber,
      taxData: {},
    });
  }
}
