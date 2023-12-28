


import { MatTableDataSource } from '@angular/material/table';
import {Employe} from '../interface/Employee'

export class DataHelper {
  static getDataOfEmp(data: Employe[], sort: any, paginator: any): MatTableDataSource<Employe> {
    const dataSource = new MatTableDataSource<Employe>(data);
    dataSource.sort = sort;
    dataSource.paginator = paginator;
    return dataSource;
  }
}
