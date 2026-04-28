// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Briefcase } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  landing: Briefcase
};

// ==============================|| MENU ITEMS - LANDING ||============================== //

const landing: NavItemType = {
  id: 'group-landing',
  title: <FormattedMessage id="flows" />,
  icon: icons.landing,
  type: 'group',
  children: [
    {
      id: 'landing',
      title: <FormattedMessage id="flows" />,
      type: 'item',
      url: '/',
      icon: icons.landing,
      breadcrumbs: false
    }
  ]
};

export default landing;
