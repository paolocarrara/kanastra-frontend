import { ReactElement } from "react";

import * as Components from ".";
import { useFileContext } from ".";
import { Loading } from "./loading";

function YesMatch(): ReactElement {
  var { state } = useFileContext()
  

  return (
    <div className="">
      <Components.FileUploader file={state.file}></Components.FileUploader>  
      
      {
        state.fileList.length != 0 &&
        <Components.Table>
        <Components.TableHeader>
        <Components.TableRow>
        <Components.TableHead>Link</Components.TableHead>
        </Components.TableRow>
        </Components.TableHeader>

        <Components.TableBody>
          {
            state.fileList.map(e => {
              return <Components.TableRow>
              <Components.TableCell>
              {e.name}
              </Components.TableCell>
            </Components.TableRow>
            })
          }
        </Components.TableBody>
      </Components.Table>
      }

      {
        state.isLoading == true &&
        <Loading />
      }
    </div>
  );
}

export { YesMatch };
