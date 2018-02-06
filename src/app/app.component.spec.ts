
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
      ],
    }).compileComponents();
  }));

  it('should show placeholder countries while loading', async(() => {

    const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    let selects = fixture.debugElement.queryAll(By.css('select'));
    expect(selects.length).toEqual(2);

    let fromOptions = selects[0].nativeElement.children;
    let toOtions = selects[1].nativeElement.children;

    expect(fromOptions.length).toEqual(1);
    expect(toOtions.length).toEqual(1);

    expect(fromOptions[0].tagName).toEqual("OPTION");
    expect(toOtions[0].tagName).toEqual("OPTION");

    expect(fromOptions[0].textContent).toEqual("Loading ()");
    expect(toOtions[0].textContent).toEqual("Loading ()");

  }));

  it('calculate exchange values', async(() => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    app.fromRatio = 2;
    app.toRatio = 0.5;

    let fromInput = fixture.debugElement.query(By.css('input#fromInput'));
    let toInput = fixture.debugElement.query(By.css('input#toInput'));

    fromInput.nativeElement.value = "2";
    fromInput.triggerEventHandler("keyup", { target: fromInput.nativeElement});
    fixture.detectChanges();
    expect(toInput.nativeElement.value).toEqual("4.00");

    toInput.nativeElement.value = "0.55";
    toInput.triggerEventHandler("keyup", { target: toInput.nativeElement});
    fixture.detectChanges();
    expect(fromInput.nativeElement.value).toEqual("0.28");

  }));

});
