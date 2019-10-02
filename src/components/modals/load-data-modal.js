// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import {media} from '../../styles';
import {ArrowRight} from 'components/common/icons';
import {LoadingSpinner} from 'components';
import FileUpload from '../common/file-uploader/file-upload';
import mapImage from './mapImage';
import SampleMapGallery from './load-data-modal/sample-data-viewer';

const StyledLoadDataModal = styled.div`
  padding: ${props => props.theme.modalPadding};
`;
const ModalTab = styled.div`
  align-items: flex-end;
  display: flex;
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: 32px;
  justify-content: space-between;

  .load-data-modal__tab__inner {
    display: flex;
  }

  .load-data-modal__tab__item.active {
    color: ${props => props.theme.textColorLT};
    border-bottom: 3px solid ${props => props.theme.textColorLT};
    font-weight: 500;
  }
  .load-data-modal__tab__item:not(.active):hover {
    color: ${props => props.theme.textColorLT};
    border-bottom: 3px solid ${props => props.theme.textColorHl};
  }
  ${media.portable`
    font-size: 12px;
  `};
`;
const StyledLoadDataModalTabItem = styled.div`
  border-bottom: 3px solid transparent;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.subtextColorLT};

  ${media.portable`
    margin-left: 16px;
    font-size: 12px;
  `};

  :hover {
    color: ${props => props.theme.textColorLT};
  }
`;
const StyledMapIcon = styled.div`
  background-image: ${mapImage};
  background-repeat: no-repeat;
  background-size: 64px 48px;
  width: 64px;
  height: 48px;
  border-radius: 2px;

  ${media.portable`
    width: 48px;
    height: 32px;
  `};
`;
const StyledTrySampleData = styled.div`
  display: flex;
  margin-bottom: 12px;

  .demo-map-title {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .demo-map-label {
    font-size: 11px;
    color: ${props => props.theme.labelColorLT};

    ${media.portable`
      font-size: 10px;
    `};
  }

  .demo-map-action {
    display: flex;
    font-size: 14px;
    align-items: center;
    color: ${props => props.theme.titleColorLT};
    cursor: pointer;

    ${media.portable`
      font-size: 12px;
    `};

    span {
      white-space: nowrap;
    }
    svg {
      margin-left: 10px;
    }
  }
`;

const StyledSpinner = styled.div`
  text-align: center;
  span {
    margin: 0 auto;
  }
  height: 300px;
  display: flex;
  align-items: center;
`;
const propTypes = {
  // call backs
  onFileUpload: PropTypes.func.isRequired
};

const TABS = {
  UPLOAD: {
    id: 'UPLOAD',
    label: 'Upload data',
    component: function UploadTab(props) {
      return <FileUpload {...props} />;
    }
  },
  SAMPLE: {
    id: 'SAMPLE',
    label: (
      <StyledTrySampleData className="try-sample-data">
        <StyledMapIcon className="demo-map-icon" />
        <div className="demo-map-title">
          <div className="demo-map-label">No data?</div>
          <div className="demo-map-action">
            <span>Try sample data</span>
            <ArrowRight height="16px" />
          </div>
        </div>
      </StyledTrySampleData>
    ),
    component: function SampleTab(props) {
      return <SampleMapGallery {...props} />;
    }
  }
};

export const LoadDataModal = props => {
  const [activeTab, setActiveTab] = useState(TABS.UPLOAD.id);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading)
    return (
      <StyledSpinner>
        <LoadingSpinner />
      </StyledSpinner>
    );

  const tabs = Object.values(TABS)
    .filter(tab => !(tab.id === TABS.SAMPLE.id && !props.dataSamples)) // omit sample tab if we have no samples
    .map(({id, label}) => (
      <StyledLoadDataModalTabItem
        className={classnames('load-data-modal__tab__item', {
          active: activeTab && id === activeTab
        })}
        key={id}
        onClick={() => setActiveTab(id)}
      >
        <div>{label}</div>
      </StyledLoadDataModalTabItem>
    ));
  return (
    <StyledLoadDataModal>
      <div className="load-data-modal">
        {tabs.length > 1 && (
          <ModalTab className="load-data-modal__tab">
            <div className="load-data-modal__tab__inner">{tabs}</div>
          </ModalTab>
        )}
        {TABS[activeTab].component({...props, setIsLoading})}
      </div>
    </StyledLoadDataModal>
  );
};

LoadDataModal.propTypes = propTypes;

const loadDataModalFactory = () => LoadDataModal;
export default loadDataModalFactory;
