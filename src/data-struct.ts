import { MakePillar, Pillar } from './pillar';

type PillarsOrArray = Pillar[] | Array<{ [key: string]: any }>;

function allArePillars(p: PillarsOrArray): p is Pillar<any>[] {
  // noinspection SuspiciousTypeOfGuard
  return p.every(
    (e) =>
      'isPillar' in e && typeof e['isPillar'] === 'function' && e.isPillar(),
  );
}

export interface DataStructBase {
  readonly shape: number[];
  readonly dataTypes: {
    [key: string]: string;
  };
  /**
   * Returns this.
   *
   * A TypeScript helper to provide setter function typing assistance
   */
  readonly Setter: DataStructSetter;
}

export interface DataStruct extends DataStructBase {
  [key: string]: any;
}

export interface DataStructSetter {
  [key: string]: (value: any, index: number, array: any[]) => any;
}

export function MakeDataStruct(pillarsOrArray: PillarsOrArray): DataStruct {
  let pillars: Pillar<any>[] = [];
  let pillarNameToIndex: { [key: string]: number } = {};

  if (allArePillars(pillarsOrArray)) {
    pillars = pillarsOrArray;
  } else {
    for (let rowIndex = 0; rowIndex < pillarsOrArray.length; rowIndex++) {
      const item = pillarsOrArray[rowIndex];
      for (const columnName of Object.keys(item)) {
        if (typeof pillarNameToIndex[columnName] !== 'number') {
          pillarNameToIndex[columnName] = pillars.length;
          pillars.push(MakePillar([], columnName));
        }

        const index = pillarNameToIndex[columnName] ?? -1;
        const pillar = pillars[index];
        pillar[rowIndex] = item[columnName];
      }
    }
  }

  const self: DataStructBase = {
    get shape() {
      return [pillars.length, pillars[0].length];
    },
    get dataTypes() {
      return pillars.reduce((a, b) => {
        a[b.name] = b.dataType;
        return a;
      }, {} as DataStructBase['dataTypes']);
    },
    get Setter(): any {
      return self;
    },
  };

  return new Proxy(self, {
    get: function (target, prop, proxy) {
      if (prop === 'Setter') {
        return proxy;
      }
      if (prop in target) {
        return (target as any)[prop];
      }
      if (typeof prop !== 'string') return null;
      const pillarIndex = pillarNameToIndex[prop];
      return pillars[pillarIndex] ?? null;
    },
    set(target: DataStructBase, prop: string | symbol, item: any): boolean {
      const propName = String(prop);
      if (prop in target) {
        throw new Error('cannot set readonly property: ' + propName);
      }
      const pillarIndex = (pillarNameToIndex as any)[prop];
      const pillar = pillars[pillarIndex];
      if (pillar) {
        for (let i = 0; i < pillar.length; i++) {
          pillar[i] = item;
        }
      } else {
        const pillar = MakePillar<any>([], propName);
        pillarNameToIndex[propName] = pillars.length;
        pillars.push(pillar);
        for (let i = 0; i < self.shape[0]; i++) {
          pillar[i] = item;
        }
      }

      return true;
    },
  }) as unknown as DataStruct;
}

if (process.argv.includes('RUN_DATA_STRUCT_MAIN')) {
  const obj = [
    {
      name: 'Adam',
      age: 21,
    },
    {
      name: 'Sylvia',
      age: 23,
    },
  ];

  const ds = MakeDataStruct(obj);
  console.log(ds.shape);
  console.log(ds.dataTypes);

  ds.Setter['google'] = (_, index) => {
    return index;
  };
  console.log(String(ds.google));
}
