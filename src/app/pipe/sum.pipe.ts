import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
   transform(items: any[] | null, attr: string): number {
    // console.log('items:', items, 'attr:', attr);
    if (!items) {
      return 0;
    }

    return items.reduce((a, b) => a + Number(b[attr]), 0);
}
}
