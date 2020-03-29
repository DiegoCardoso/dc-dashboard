# Creating a new Vaadin component

1. Clone this repo

        git clone git@github.com:vaadin/vaadin-element-skeleton.git new-element-name

2. When in the `new-component-name` folder, replace all `dc-dashboard` and `DcDashboard` occurrences with your new element name.

        perl -pi -e 's,dc-dashboard,new-component-name,g' *.* test/*/* src/* theme/*/*
        perl -pi -e 's,DcDashboard,NewComponentName,g' *.* test/*/* src/* theme/*/*

3. Rename the element

        mv dc-dashboard.ts new-component-name.ts
        mv src/dc-dashboard.ts src/new-component-name.ts
        mv theme/lumo/dc-dashboard.ts theme/lumo/new-component-name.ts
        mv theme/material/dc-dashboard.ts theme/material/new-component-name.ts

4. Check that everything works all right

        npm install
        npm start

  And check that everything works:

  - http://localhost:3000/

5. Remove this README file since it is not needed any more.

        rm README_CREATE_NEW.md

5. Finally, initialize git so as we have an empty history for our `<new-component-name>`

        rm -rf .git
        git init
        git add * .??*
        git commit -m 'First Commit' -a

