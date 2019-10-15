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

import {bytesToHex, stringToUTF8Bytes, stringToUTF16Bytes, stringToUTF32Bytes} from './utils/stringutil';

// export default(): React.ReactNode => {
//   return <PageHeaderWrapper>
//     this is a page
//   </PageHeaderWrapper>
// };

class StrCodec extends Component {

  constructor(props) {
    super(props);
    this.state = {
      word:'',
      utf8:'',
      gbk:'',
      big5:'',
      utf16:'',
    };
  }

  onchangeWord = (e:any) => {
    const {value} = e.target;
    this.setState({word: value});
    this.convert2Hex(value, 'gbk');
    this.convert2Hex(value, 'utf8');
    this.convert2Hex(value, 'big5');
    this.convert2Hex(value, 'utf16');
  }

  convert2Hex = (word:string, encode:string) => {
    const iconv = require('iconv-lite');
    let buf = iconv.encode(word, encode);
    let hex = bytesToHex(buf);
    this.setState({[encode]: hex});
  }

  onchangeHex2Word = (e:any) => {
    const {value} = e.target;
    const encode = e.target.name;
    let array = [];
    let index = 0;
    for(var i = 0; i < value.length; i++) {
        if(i % 2 == 0) {
          let data = value.substr(i, 2);
          array[index]= ('0x'+data);
          index++;
        }
    }
    // console.log(array);

    const iconv = require('iconv-lite');
    // console.log(encode);
    let wordStr = iconv.decode(Buffer.from(array), encode);
    this.setState({[encode]: value});
    this.setState({word: wordStr});
  }


  render() {
    return (
      <>
      <PageHeaderWrapper>
        <div>
          <div>
            <Card bordered={false} title={<FormattedMessage id="strcodec.title.word" />}  size="large">
              <Row gutter={16}>
                <Col lg={12} md={24} sm={24}>
                  <Input.TextArea id="id-txt-literal" placeholder="请输入文字" size="large" 
                    autosize={{ minRows: 5, maxRows: 20 }} 
                    name="word"
                    value={this.state.word}
                    onChange={this.onchangeWord.bind(this)}
                    />
                </Col>
              </Row>
            </Card>
          </div>
          
          <div style={{ height: 30 }}></div>

          <div>
            <Row gutter={16}>
              <Col lg={12} md={24} sm={24}>
                <Card bordered={false} title={<FormattedMessage id="strcodec.title.utf8" /> } size="large">
                  <Input.TextArea id="id-txt-utf8" size="large" 
                    autosize={{ minRows: 5, maxRows: 20 }} 
                    value={this.state.utf8} 
                    name="utf8"
                    onChange={this.onchangeHex2Word.bind(this)}/>
                </Card>
              </Col>

              <Col lg={12} md={24} sm={24}>
                <Card bordered={false} title={<FormattedMessage id="strcodec.title.gbk" /> } size="large">
                  <Input.TextArea id="id-txt-gbk" size="large" 
                    autosize={{ minRows: 5, maxRows: 20 }} 
                    name="gbk"
                    value={this.state.gbk} 
                    onChange={this.onchangeHex2Word.bind(this)} />
                </Card>
              </Col>
            </Row>
          </div>

          <div style={{ height: 30 }}></div>

          <div>
            <Row gutter={16}>
              <Col lg={12} md={24} sm={24}>
                <Card bordered={false} title={<FormattedMessage id="strcodec.title.unicode" /> } size="large">
                  <Input.TextArea id="id-txt-unicode" size="large" 
                    autosize={{ minRows: 5, maxRows: 20 }} 
                    name="utf16"
                    value={this.state.utf16} 
                    onChange={this.onchangeHex2Word.bind(this)} />
                </Card>
              </Col>

              <Col lg={12} md={24} sm={24}>
                <Card bordered={false} title={<FormattedMessage id="strcodec.title.big5" /> } size="large">
                  <Input.TextArea id="id-txt-big5" size="large" 
                    autosize={{ minRows: 5, maxRows: 20 }} 
                    name="big5"
                    value={this.state.big5} 
                    onChange={this.onchangeHex2Word.bind(this)} />
                </Card>
              </Col>
            </Row>
          </div>

        </div>
      </PageHeaderWrapper>
      </>
    )
  }
}

export default StrCodec;