// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Book1, I24Support, Security, MessageProgramming, DollarSquare, Airplane } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  page: Book1,
  authentication: Security,
  maintenance: MessageProgramming,
  pricing: DollarSquare,
  contactus: I24Support,
  landing: Airplane
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  icon: icons.page,
  children: [
    {
      id: 'authentication',
      title: <FormattedMessage id="authentication" />,
      type: 'item',
      icon: icons.authentication,
      url: '/login'
    },
    {
      id: 'maintenance',
      title: <FormattedMessage id="maintenance" />,
      type: 'collapse',
      icon: icons.maintenance,
      isDropdown: true,
      children: [
        {
          id: 'error-404',
          title: <FormattedMessage id="error-404" />,
          type: 'item',
          url: '/maintenance/404',
          target: true
        },
        {
          id: 'error-500',
          title: <FormattedMessage id="error-500" />,
          type: 'item',
          url: '/maintenance/500',
          target: true
        },
        {
          id: 'under-construction-collapse',
          title: <FormattedMessage id="under-construction" />,
          type: 'collapse',
          children: [
            {
              id: 'under-construction-1',
              title: (
                <>
                  <FormattedMessage id="under-construction" /> 1
                </>
              ),
              type: 'item',
              url: '/maintenance/under-construction',
              target: true
            },
            {
              id: 'under-construction-2',
              title: (
                <>
                  <FormattedMessage id="under-construction" /> 2
                </>
              ),
              type: 'item',
              url: '/maintenance/under-construction2',
              target: true
            }
          ]
        }
      ]
    },
    {
      id: 'price',
      title: <FormattedMessage id="price" />,
      type: 'collapse',
      icon: icons.pricing,
      children: [
        {
          id: 'price1',
          title: (
            <>
              <FormattedMessage id="price" /> 1
            </>
          ),
          type: 'item',
          url: '/price/price1'
        },
        {
          id: 'price2',
          title: (
            <>
              <FormattedMessage id="price" /> 2
            </>
          ),
          type: 'item',
          url: '/price/price2'
        }
      ]
    },
    {
      id: 'contact-us',
      title: <FormattedMessage id="contact-us" />,
      type: 'item',
      url: '/contact-us',
      icon: icons.contactus,
      target: true
    },
    {
      id: 'landing',
      title: <FormattedMessage id="landing" />,
      type: 'item',
      icon: icons.landing,
      url: '/landing'
    }
  ]
};

export default pages;
