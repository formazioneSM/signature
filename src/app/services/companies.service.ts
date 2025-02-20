import { resource, ResourceRef } from "@angular/core"
import { Company } from "../models/company.model"
import { Option } from "../components/ui/select/select.component";

export const getCompanies = ():ResourceRef<Option[] | undefined> => {
  return resource({
    loader: async () => {
     let res:Company[] =  await (await fetch('data/companies.json')).json();
     return res!.map(r => ({name: r.name, value: r, icon: r.logo, selected: r.name === 'DigitalPlatforms SpA'})) as Option[]
    } 
  })
}
