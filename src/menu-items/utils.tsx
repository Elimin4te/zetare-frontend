// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Calendar1, Setting2 } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  utils: Setting2,
  calendar: Calendar1
};

// ==============================|| MENU ITEMS - UTILS ||============================== //

const utils: NavItemType = {
  id: 'group-utils',
  title: <FormattedMessage id="utils" />,
  icon: icons.utils,
  type: 'group',
  children: [
    {
      id: 'planification',
      title: <FormattedMessage id="planification" />,
      type: 'item',
      url: '/utils/planification',
      icon: icons.calendar,
      breadcrumbs: false
    }
  ]
};

export default utils;
