import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import withRouter from 'umi/withRouter';
import { Layout, ConfigProvider } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import AmHeader from './header';
import LeftMenu from './leftMenu';
import { platformToken } from '@/utils/constant';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

@connect(({ loading }) => ({
  loading: loading.global,
}))
class IndexLayout extends PureComponent {
  componentDidMount(){
  }
  

  render() {
    const { location, children, loading,dispatch } = this.props;
    
    if ('/login' == location.pathname) {
      return (
        <Fragment>
          <ConfigProvider locale={zh_CN}>
            {children}
          </ConfigProvider>
        </Fragment>
      );
    }
    
    /**
     * 此处根路径被切换至登录页面
     */
    if ('/' == location.pathname || undefined == sessionStorage.getItem(platformToken)) {
      router.replace('login')
    }
    if(location.pathname!='/login' && undefined == sessionStorage.getItem(platformToken)){
      router.push('/login')
    }

    return (
      <Fragment>
        <AmHeader location={location} />
        <div className='wrap-con' style={{ height: 'calc(100vh - 56px)' }}>
          {/*菜单提出*/}
          <LeftMenu location={location} />
          <div className='wrap-right' style={{ width: 'calc(100vh - 256px)' }}>
            <div className='wrap-main'>
              <ConfigProvider locale={zh_CN}>
                {children}
              </ConfigProvider>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(IndexLayout);
