import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useWindowScroll from '@/hook/useWindowScroll';
import { throttle } from 'lodash';

import cn from 'classnames';

import { Avatar, Slider } from 'antd';

interface PostPositionType {
  top: number;
  bottom: number;
}

interface TopicListType {
  date: string;
  articles: ArticleType[];
}

interface ArticleType {
  wallet: string;
  content: string;
}

const Topic = () => {
  const router = useRouter();

  if (process.env.NODE_ENV === 'production') {
    useEffect(() => {
      router.replace('/');
    }, [router]);

    return null;
  }

  const scroll = useWindowScroll();
  const topicRef = useRef<any>([]);
  const postRefs = useRef<any>([]);
  const topicList: TopicListType[] = [
    {
      date: 'Jul 31, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 30, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 29, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 28, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 27, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 26, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 25, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 23, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 21, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 20, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
    {
      date: 'Jul 16, 2022',
      articles: [
        {
          wallet: '0xabcd...abcd',
          content: `This is an initial funding proposal for the Gitcoin Product Collective (GPC) Workstream requesting ratification as a structured workstream and budgetary funds for Season 15 (1 August 2022 through 31 October 2022). The full governance post can be found here: https://gov.gitcoin.co/t/s15-proposal-gitcoin-product-collective-workstream-proposal-budget-request
          The GPC is seeking the following funding:
          Season 15 Total Need: $983,429 (413,206 GTC)
          60 day reserves*: $462,085 (194,154 GTC)
          Amount Requested from Treasury $1,445,514 (607,360 GTC)
          *60 day reserves are calculated only against the contributor compensation and payroll related OpEx.`,
        },
      ],
    },
  ];
  const [slideTooltipOpen, setSlideTooltipOpen] = useState<boolean>(false);
  const [postPosition, setPostPosition] = useState<PostPositionType[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentDate, setCurrentDate] = useState<string>(topicList[0].date);

  useEffect(() => {
    setSlideTooltipOpen(true);
    document.fonts.ready.then(() => {
      postRefs.current.forEach((post: any) => {
        const { top, bottom } = post.getBoundingClientRect();
        setPostPosition((posPrev) => [...posPrev, { top: top, bottom: bottom }]);
      });
    });
  }, []);

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (postPosition.length <= 0) return;
      postPosition.forEach((pos: PostPositionType, index: number) => {
        if (scroll > pos.top && scroll < pos.bottom) {
          setCurrentStep(index + 1);
        } else if (scroll < postPosition[0].top) {
          // 첫 번째 post 보다 위 일경우
          setCurrentStep(1);
        } else if (scroll > postPosition[postPosition.length - 1].bottom) {
          // 마지막 section 보다 아래 일경우
          setCurrentStep(postPosition.length);
        }
      });

      if (window.innerHeight + scroll >= document.body.scrollHeight) {
        setCurrentStep(postPosition.length);
      }
    });
  }, [scroll]);

  return (
    <div className={cn('topic-wrap')} ref={topicRef}>
      <div className={cn('topic-inner')}>
        <div className={cn('left-wrap')}>
          <div className={cn('slider-wrap')}>
            <span>2022-07-05</span>
            <Slider
              reverse
              vertical
              value={currentStep}
              min={1}
              max={postRefs.current.length}
              onChange={(value) => {
                if (value === undefined) return;
                setCurrentStep(value);
                setCurrentDate(topicList[value - 1].date);
              }}
              onAfterChange={(value: number) => {
                window.scrollTo(0, postPosition[value - 1].top);
              }}
              tooltip={{
                open: slideTooltipOpen,
                getPopupContainer: (triggerNode) => triggerNode.parentNode as HTMLElement,
                formatter: (value) => {
                  if (value === undefined) return;
                  return (
                    <div className={cn('slide-content')}>
                      {value}/{postRefs.current.length}
                      <span>{currentDate}</span>
                    </div>
                  );
                },
              }}
            />
            <span>2022-07-09</span>
          </div>
        </div>
        <div className={cn('right-wrap')}>
          <div className={cn('right-inner')}>
            <h2>Community Governance Process</h2>
            <div className={cn('topic-list')}>
              {topicList.map((topic: TopicListType, index: number) => (
                <div key={`topic-list-${index}`} className={cn('topic-post')} ref={(el) => (postRefs.current[index] = el)}>
                  <span>{topic.date}</span>
                  {topic.articles.map((article: ArticleType, articleIndex: number) => (
                    <div key={`article-list-${articleIndex}`} className={cn('topic-article')}>
                      <Avatar />
                      <p>{article.content}</p>
                      <a href="@pages/dao/wonder/topic#"></a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
