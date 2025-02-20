export interface Signature {
    azienda: Azienda
    area: Area
    indirizzo: Indirizzo
    mobile: string
    version: Version
    interno: string
    nomecognome: string
    disclaimer: boolean
    ruolo: any
    avvisoambientale: boolean
  }
  
  export interface Version {
    name: string,
    logo:string
  }

  export interface Azienda {
    name: string
    value: Value
    icon: string
    last: boolean
    selected: boolean
  }
  
  export interface Value {
    name: string
    btnName: string
    logo: string
    color: string
    website: Website
    versions: any[]
    workplace: Workplace[]
  }
  
  export interface Website {
    name: string
    href: string
  }
  
  export interface Workplace {
    id: number
    name: string
    address: string
    phone: string
    labelPhone: string
    interno: any
    internoLabel: any
  }
  
  export interface Area {
    name: string
    value: Value2
    last: boolean
    selected: boolean
  }
  
  export interface Value2 {
    name: string
  }
  
  export interface Indirizzo {
    id: number
    name: string
    address: string
    phone: string
    labelPhone: string
    interno: any
    internoLabel: any
    last: boolean
    selected: boolean
  }