export interface Company {
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