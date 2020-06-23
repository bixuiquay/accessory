import { OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { BaseComponent } from './base.component';

export class BaseControlValueAccessor<T> extends BaseComponent implements ControlValueAccessor, OnInit {
  formControl: AbstractControl;

  protected _value: T;

  protected onChange: (value: T) => Function;

  protected onTouched: Function;

  protected get value(): T {
    return this._value;
  }

  protected set value(newValue: T) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.onChange(newValue);
    }
  }

  constructor(@Self() @Optional() public ngControl: NgControl) {
    super();
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.formControl = this.ngControl.control;
  }

  writeValue(value: T) {
    this._value = value;
  }

  registerOnChange(fn: (value: T) => Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => Function) {
    this.onTouched = fn;
  }
}
