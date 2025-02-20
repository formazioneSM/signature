import { resource, ResourceRef } from "@angular/core";
import { Option } from "../components/ui/select/select.component";
import { Banner } from "../models/banner.model";

export const getBanners = ():ResourceRef<Option[] | undefined> => {
  return resource({
    loader: async () => {
     let res:Banner[] =  await (await fetch('data/banners.json')).json();
     return res!.map(r => ({name: r.name, value: r})) as Option[]
    } 
  })
}