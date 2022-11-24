import { ComponentRef, ElementRef, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { DialogRef, InternalDialogRef } from './dialog-ref';

type Sizes = 'sm' | 'md' | 'lg' | 'fullScreen' | string;
export type DragConstraint = 'none' | 'bounce' | 'constrain';

export interface GlobalDialogConfig {
  sizes: Partial<
    Record<
      Sizes,
      { width?: string | number; height?: string | number; minHeight?: string | number; maxHeight?: string | number }
    >
  >;
  backdrop: boolean;
  container: ElementRef<Element> | Element;
  closeButton: boolean;
  draggable: boolean;
  dragConstraint: DragConstraint;
  enableClose: boolean;
  resizable: boolean;
  width: string | number;
  height: string | number;
  minHeight: string | number;
  maxHeight: string | number;
  size: Sizes;
  windowClass: string;
  onOpen: () => void | undefined;
  onClose: () => void | undefined;
}

export interface DialogConfig<Data = any> extends Omit<GlobalDialogConfig, 'sizes'> {
  id: string;
  data: Data;
  vcr: ViewContainerRef;
}

export type JustProps<T extends object> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : T[K];
};

export type ExtractRefProp<T> = {
  [P in keyof T]: T[P] extends DialogRef<any> ? P : never;
}[keyof T];

export type ExtractData<T> = T[ExtractRefProp<T>] extends DialogRef<infer Data> ? Data : never;

export interface OpenParams {
  config: DialogConfig;
  dialogRef: InternalDialogRef;
}

export interface AttachOptions {
  dialogRef: InternalDialogRef;
  ref: ComponentRef<any> | TemplateRef<any>;
  view: ViewRef;
  attachToApp: boolean;
  config: DialogConfig;
}
