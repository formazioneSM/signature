import { resource, ResourceRef } from "@angular/core"
import { Option } from "../components/ui/select/select.component";
import { Area } from "../models/area.model";
import { Role } from "../models/role.model";

export const getRoles = ():ResourceRef<Option[] | undefined> => {
  return resource({
    loader: async () => {
     let res:Role[] =  await (await fetch('data/roles.json')).json();
     return res!.map(r => ({name: r.name, value: r})) as Option[]
    } 
  })
}