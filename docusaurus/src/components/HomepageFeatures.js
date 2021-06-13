import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'No email required',
    Svg: require('../../static/img/undraw_fill_form.svg').default,
    description: (
      <>
        It's a very simple mock payment gateway. We don't ask for your email and spam you incessantly. No lengthy forms required.
          Get started in less than 60 seconds
      </>
    ),
  },
  {
    title: 'Comprehensive documentation',
    Svg: require('../../static/img/undraw_Documents.svg').default,
    description: (
      <>
        The documentation consists of detailed guides on how to create a merchant account, and start transacting
      </>
    ),
  },
  {
    title: 'For developers built by developers',
    Svg: require('../../static/img/undraw_dev_productivity.svg').default,
    description: (
      <>
        As developers, we understand you might wish to create projects and include fake payments in your website.
          We thought making of making it easier and accessible...through simple documentation and no BS!
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
