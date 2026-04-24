// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Home2 } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  landing: Home2
};

// ==============================|| MENU ITEMS - LANDING ||============================== //

const landing: NavItemType = {
  id: 'group-landing',
  title: <FormattedMessage id="landing" />,
  icon: icons.landing,
  type: 'group',
  children: [
    {
      id: 'landing',
      title: <FormattedMessage id="landing" />,
      type: 'item',
      url: '/landing',
      icon: icons.landing,
      breadcrumbs: false
    }
  ]
};

export default landing;
