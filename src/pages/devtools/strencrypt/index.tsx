import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip,
  Row,
  Col,
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';



class StrEncrypt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      word:'',
      md5:'',
      base64:'',
    };
  }

  onchangeEncrypt = (e:any) => {
    const {value} = e.target;
    this.setState({word: value});
    this.doBase64Encrypt(value);
    this.doMD5Encrypt(value);
  }

  doBase64Encrypt = (word:string) => {
    //TODO
    if(word.length > 0) {
      var Base64 = require('js-base64').Base64;
      let value = Base64.encode(word);
      this.setState({base64: value});
    } else {
      this.setState({base64: ''});
    }
  }

  doBase64Decrypt = (baseStr:string) => {
    //TODO
    if(baseStr.length > 0) {
      var Base64 = require('js-base64').Base64;
      try {
        let value = Base64.decode(baseStr);
        this.setState({word: value});
      } catch(err) {
        console.log('', err);
      }
    } else {
      this.setState({word: ''});
    }
  }

  doMD5Encrypt = (word:string) => {
    var MD5 = require('md5.js')
    var md5stream = new MD5();
    let value = md5stream.update(word).digest('hex');
    this.setState({md5: value});
  }

  onchangeDecrypt = (e:any) => {
    const {value} = e.target;
    const encode = e.target.name;
    this.setState({[encode]: value});

    if (encode == 'base64') {
      this.doBase64Decrypt(value);
    } else {
    }
    
  }


  render() {
    return (
      <>
      <PageHeaderWrapper>
        <div>
          <div>
            <Card bordered={false} title={<FormattedMessage id="strenc.title.word" />}  size="large">
              <Row gutter={16}>
                <Col lg={12} md={24} sm={24}>
                  <Input.TextArea id="id-txt-literal" placeholder="请输入文字" size="large" 
                    autosize={{ minRows: 5, maxRows: 20 }} 
                    name="word"
                    value={this.state.word}
                    onChange={this.onchangeEncrypt.bind(this)}
                    />
                </Col>
              </Row>
            </Card>
          </div>
          
          <div style={{ height: 30 }}></div>

          <div>
            <Row gutter={16}>
              <Col lg={12} md={24} sm={24}>
                <Card bordered={false} title={<FormattedMessage id="strenc.title.base64" /> } size="large">
                  <Input.TextArea id="id-txt-utf8" size="large" 
                    autosize={{ minRows: 5, maxRows: 20 }} 
                    value={this.state.base64} 
                    name="base64"
                    onChange={this.onchangeDecrypt.bind(this)}/>
                </Card>
              </Col>

              <Col lg={12} md={24} sm={24}>
                <Card bordered={false} title={<FormattedMessage id="strenc.title.md5" /> } size="large">
                  <Input.TextArea id="id-txt-gbk" size="large" 
                    autosize={{ minRows: 5, maxRows: 20 }} 
                    name="md5"
                    value={this.state.md5} 
                    onChange={this.onchangeDecrypt.bind(this)} />
                </Card>
              </Col>
            </Row>
          </div>

          <div style={{ height: 30 }}></div>

          <div>
          </div>

        </div>
      </PageHeaderWrapper>
      </>
    )
  }
}

export default StrEncrypt;