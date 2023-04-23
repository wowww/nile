import cn from 'classnames';
import DiscussionCard, { DiscussionCardProps } from './DiscussionCard';

const DiscussionTab = () => {
  const Dummy: DiscussionCardProps[] = [
    {
      title: 'Community Governance Process',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit a metus sit amet rutrum. Sed tempus vel nibh vel scelerisque. Maecenas eleifend orci ac qua...Lorem ipsum dolor sit amet, consectetur...',
      imgUrlList: ['https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1'],
      participantCount: 22,
      commentCount: 130,
      hits: 442,
      recentActivity: 'APR 10',
      isNotice: true,
      href: '/',
    },
    {
      title: 'Community Governance Process',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit a metus sit amet rutrum. Sed tempus vel nibh vel scelerisque. Maecenas eleifend orci ac qua...Lorem ipsum dolor sit amet, consectetur...',
      imgUrlList: ['https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1'],
      participantCount: 123,
      commentCount: 55,
      hits: 123,
      recentActivity: 'APR 05',
      href: '/',
    },
    {
      title: 'Community Governance Process',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit a metus sit amet rutrum. Sed tempus vel nibh vel scelerisque. Maecenas eleifend orci ac qua...Lorem ipsum dolor sit amet, consectetur...',
      imgUrlList: ['https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1'],
      participantCount: 22,
      commentCount: 130,
      hits: 442,
      recentActivity: 'APR 01',
      href: '/',
    },
    {
      title: 'Community Governance Process',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit a metus sit amet rutrum. Sed tempus vel nibh vel scelerisque. Maecenas eleifend orci ac qua...Lorem ipsum dolor sit amet, consectetur...',
      imgUrlList: ['https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1'],
      participantCount: 223,
      commentCount: 130,
      hits: 132,
      recentActivity: 'MAR 12',
      href: '/',
    },
    {
      title: 'Community Governance Process',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis suscipit a metus sit amet rutrum. Sed tempus vel nibh vel scelerisque. Maecenas eleifend orci ac qua...Lorem ipsum dolor sit amet, consectetur...',
      imgUrlList: ['https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1', 'https://picsum.photos/32/32/?image=1'],
      participantCount: 58,
      commentCount: 13,
      hits: 1442,
      recentActivity: 'OCT 02',
      href: '/',
    },
  ];
  return (
    <div className={cn('')}>
      <ul className={cn('governance-card-list')}>
        {Dummy.map((el, index) => (
          <li key={el.title + index}>
            <DiscussionCard {...el} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionTab;
