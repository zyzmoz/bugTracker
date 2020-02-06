import React, {useState} from 'react';
import { Accordion, AccordionItem, AccordionContent, AccordionTitle, Menu as FMenu, MenuItem, MenuText } from 'react-foundation';
import { Link, withRouter } from 'react-router-dom';
import routes from '../../routes';

const RenderMenuItem = (route) => {
  const { subRoutes, pathname } = route;  
  const [active, setActive] = useState(false);  
  if (subRoutes && subRoutes.length > 0) {
    return (
      <MenuItem key={route.i}  >
        <Accordion>
          <AccordionItem isActive={active} >
            <AccordionTitle onClick={() => setActive(!active)} style={{fontSize: '16px'}}>{route.title}</AccordionTitle>
            <AccordionContent style={{display: active?'block': 'none', padding: '8px'}}>
              {subRoutes.map((subRoute, i) =>
                <Link
                  style={pathname == subRoute.path? {backgroundColor: "#d6d6d6"}: {}}    
                  key={i} to={subRoute.path}>{subRoute.title}</Link>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </MenuItem>
    )

  } else {
    return (
      <MenuItem key={route.i} style={pathname == route.path? {backgroundColor: "#d6d6d6"}: {}}>
        <Link to={route.path}>{route.title}</Link>
      </MenuItem>
    )
  }

}

const Menu = (props) => {
  const { pathname } = props.location;

  return (
    <FMenu isVertical>
      <MenuText>
        <h5>Menu</h5>
      </MenuText>

      {
        routes.map((route, i) => RenderMenuItem({...route, i, pathname}))
      }

      {/* <MenuItem >
        <Accordion>
          <AccordionItem isActive={active} >
            <AccordionTitle>Accordion 1</AccordionTitle>
            <AccordionContent style={{display: active?'block': 'none'}}>
              <p>
                First accordion contents
      </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTitle>Accordion 2</AccordionTitle>
            <AccordionContent >
              <p>
                Second accordion contents
      </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            <AccordionTitle>Accordion 3</AccordionTitle>
            <AccordionContent>
              <p>
                Third accordion contents
      </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>


      </MenuItem> */}
    </FMenu>
  );
};

export default withRouter(Menu);