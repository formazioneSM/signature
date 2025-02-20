import { resource, ResourceRef } from "@angular/core"
import { Option } from "../components/ui/select/select.component";
import { Area } from "../models/area.model";

export const getAreas = ():ResourceRef<Option[] | undefined> => {
  return resource({
    loader: async () => {
     let res:Area[] =  await (await fetch('data/areas.json')).json();
     return res!.map(r => ({name: r.name, value: r})) as Option[]
    } 
  })
}