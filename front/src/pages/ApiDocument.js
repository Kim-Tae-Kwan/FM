import { Container, Row, Table } from "react-bootstrap";
import Footer from "../template/Footer";
import Header from "../template/Header";
import JSONPretty from 'react-json-pretty';
import base64 from 'base-64';
import '../css/ApiDocument.css'

const franchiseeResponse = {
    "franchisees": [
        {
            "businessNumber": "7511024245",
            "name": "(주) C.H.B Company 이랴이랴",
            "firstImg": "/test/test.jpg",
            "address": {
                "postalCode": "123456789",
                "road": "부산광역시 수영구 광안로 9, 2~3층 (광안동)",
                "jibun": "부산광역시 수영구 광안동 144 - 25 외1필지 (2~3층) ",
                "detail": "null"
            },
            "x": 129.1140697,
            "y": 35.1571629,
            "tel": "0517511024",
            "ownerName": "kim",
            "intro": "testasdf",
            "createDate": "2022-07-15 12:08:06"
        }
    ]
}

const menuResponse = {
    "menus": [
        {
            "name": "파리바게트 메뉴1",
            "image": {
                "path": "/api/v1/file/fm_34f7f1cec31a492b932eb1acbf6bdc20.jpg",
                "size": "15713",
                "name": "fm_34f7f1cec31a492b932eb1acbf6bdc20.jpg",
                "type": "image/jpeg",
                "createDate": "2022-07-22 09:28:24"
            },
            "description": "파리바게트 메뉴1 소개입니다",
            "price": 20000,
            "createDate": "2022-07-22 09:28:30"
        },
        {
            "name": "파리바게트 메뉴2",
            "image": {
                "path": "/api/v1/file/fm_331ea3db407f45508995e0b25974037c.jpg",
                "size": "8185",
                "name": "fm_331ea3db407f45508995e0b25974037c.jpg",
                "type": "image/jpeg",
                "createDate": "2022-07-22 09:28:39"
            },
            "description": "파리바게트 메뉴2입니다",
            "price": 15000,
            "createDate": "2022-07-22 09:28:45"
        }
    ]
}

const scheduleResponse = {
    monday: "09:00 ~ 18:00",
    thursday: "09:00 ~ 18:00",
    wednesday: "09:00 ~ 18:00",
    tuesday: "09:00 ~ 18:00",
    friday: "09:00 ~ 18:00",
    saturday: "09:00 ~ 18:00",
    sunday: "09:00 ~ 18:00"
  }
const apiDocuments = [
    {
        title : "가맹점 정보 검색",
        intro : "JTNDcCUzRSVFQSVCMCU4MCVFQiVBNyVCOSVFQyVBMCU5MCUyMCVFQyVBMCU5NSVFQiVCMyVCNCVFQiVBNSVCQyUyMCVFQyVBMCU5QyVFQSVCMyVCNSVFRCU5NSU5OCVFQiU4QSU5NCUyMEFQSSVFQyU5RSU4NSVFQiU4QiU4OCVFQiU4QiVBNC4lMjAlRUElQjAlODAlRUIlQTclQjklRUMlQTAlOTAlRUMlOUQlOTglMjAlRUMlODIlQUMlRUMlOTclODUlRUMlOUUlOTAlRUIlQjIlODglRUQlOTglQjglMkMlMjAlRUElQjAlODAlRUIlQTclQjklRUMlQTAlOTAlMjAlRUIlQUElODUlMkMlMjAlRUMlQTMlQkMlRUMlODYlOEMlMkMlMjAlRUMlQTIlOEMlRUQlOTElOUMlMkMlMjAlRUMlQTAlODQlRUQlOTklOTQlRUIlQjIlODglRUQlOTglQjglMjAlRUIlOTMlQjElRUMlOUQlOTglMjAlRUIlOEIlQTQlRUMlOTYlOTElRUQlOTUlOUMlMjAlRUMlQTAlOTUlRUIlQjMlQjQlRUIlQTUlQkMlMjAlRUQlOTUlQTglRUElQkIlOTglMjAlRUMlQTAlOUMlRUElQjMlQjUlRUQlOTUlQTklRUIlOEIlODglRUIlOEIlQTQuJTNDJTJGcCUzRSUwQSUyMCUyMCUyMCUyMCUyMCUyMCUyMCUyMCUzQ3AlM0UlRUQlOEUlOTglRUMlOUQlQjQlRUMlQTclOTUlRUMlOUQlODQlMjAlRUQlODYlQjUlRUQlOTUlOUMlMjAlM0NiJTNFJUVCJUE2JUFDJUVDJThBJUE0JUVEJThBJUI4JTIwJUVEJTk4JTk1JUVEJTgzJTlDJTNDJTJGYiUzRSVFQyU5OSU4MCUyMCVFQyU4MiVBQyVFQyU5NyU4NSVFQyU5RSU5MCVFQiVCMiU4OCVFRCU5OCVCOCVFQiVBNSVCQyUyMCVFRCU4NiVCNSVFRCU5NSU5QyUyMCUzQ2IlM0UlRUIlOEIlQTglRUMlOUQlQkMlMjAlRUQlOTglOTUlRUQlODMlOUMlM0MlMkZiJTNFJUVCJUE1JUJDJTIwJUVDJUEwJTlDJUVBJUIzJUI1JUVEJTk1JUE5JUVCJThCJTg4JUVCJThCJUE0LiUzQyUyRnAlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NwJTNFJUVCJUIwJTlDJUVBJUI4JTg5JTIwJUVCJUIwJTlCJUVDJTlEJTgwJTIwSldUJTIwJUVEJTg2JUEwJUVEJTgxJUIwJUVDJTlEJTg0JTIwJUVEJTk3JUE0JUVCJThEJTk0JUVDJTk3JTkwJTIwJUVCJThCJUI0JUVDJTk1JTg0JTIwJTNDY29kZSUzRUdFVCUzQyUyRmNvZGUlM0UlRUMlOUMlQkMlRUIlQTElOUMlMjAlRUMlOUElOTQlRUMlQjIlQUQlRUQlOTUlQTklRUIlOEIlODglRUIlOEIlQTQuJTIwJUVEJThFJTk4JUVDJTlEJUI0JUVDJUE3JTgwJTIwJUVCJUIyJTg4JUVEJTk4JUI4JTJDJTIwJUVEJTk1JTlDJTIwJUVEJThFJTk4JUVDJTlEJUI0JUVDJUE3JTgwJTIwJUVBJUIyJUIwJUVBJUIzJUJDJTIwJUVDJTg4JTk4JUVDJTk5JTgwJTIwJUVEJTk1JUE4JUVBJUJCJTk4JTIwJUVBJUIyJUIwJUVBJUIzJUJDJTIwJUVEJTk4JTk1JUVDJThCJTlEJTIwJUVEJThDJThDJUVCJTlEJUJDJUVCJUFGJUI4JUVEJTg0JUIwJUVDJTlEJTk4JTIwJUVBJUIwJTkyJUVDJTlEJTg0JTIwJUVDJTg0JUEwJUVEJTgzJTlEJUVDJUEwJTgxJUVDJTlDJUJDJUVCJUExJTlDJTIwJUVDJUI2JTk0JUVBJUIwJTgwJUVEJTk1JUEwJTIwJUVDJTg4JTk4JTIwJUVDJTlFJTg4JUVDJThBJUI1JUVCJThCJTg4JUVCJThCJUE0LiUzQyUyRnAlM0UlMEElMjAlMjAlMjAlMjAlMjAlMjAlMjAlMjAlM0NwJTNFJUVDJTlEJTkxJUVCJThCJUI1JUVDJTlEJTgwJTIwJTNDY29kZSUzRUpTT04lM0MlMkZjb2RlJTNFJUVBJUIzJUJDJTIwJTNDY29kZSUzRVhNTCUzQyUyRmNvZGUlM0UlMjAlRUQlOTglOTUlRUMlOEIlOUQlRUMlOUQlODQlMjAlRUMlQTclODAlRUMlOUIlOTAlRUQlOTUlQTklRUIlOEIlODglRUIlOEIlQTQuJTIwJUVDJTlBJTk0JUVDJUIyJUFEJTIwJUVDJThCJTlDJTIwJUVEJThDJThDJUVCJTlEJUJDJUVCJUFGJUI4JUVEJTg0JUIwJUVDJTlEJTk4JTIwJTNDY29kZSUzRXJlc3VsdFR5cGUlM0MlMkZjb2RlJTNFJTIwJUVCJUI2JTgwJUVCJUI2JTg0JUVDJTk3JTkwJTIwJUVDJTlCJTkwJUVEJTk1JTk4JUVCJThBJTk0JTIwJUVDJTlEJTkxJUVCJThCJUI1JTIwJUVEJTk4JTk1JUVDJThCJTlEJUVDJTlEJTg0JTIwJUVDJUE3JTgwJUVDJUEwJTk1JUVEJTk1JUEwJTIwJUVDJTg4JTk4JTIwJUVDJTlFJTg4JUVDJThBJUI1JUVCJThCJTg4JUVCJThCJUE0LiUyMCVFQiVCMyU4NCVFQiU4RiU4NCVFQiVBMSU5QyUyMCVFRCU4RiVBQyVFQiVBNyVCNyVFQyU5RCU4NCUyMCVFQyVBNyU4MCVFQyVBMCU5NSVFRCU5NSU5OCVFQyVBNyU4MCUyMCVFQyU5NSU4QSVFQyU5RCU4MCUyMCVFQSVCMiVCRCVFQyU5QSVCMCUyMCVFQyU5RCU5MSVFQiU4QiVCNSVFQyU5RCU4MCUyMCUzQ2NvZGUlM0VKU09OJTNDJTJGY29kZSUzRSUyMCVFRCU5OCU5NSVFQyU4QiU5RCVFQyU5QyVCQyVFQiVBMSU5QyUyMCVFQiVCMCU5OCVFRCU5OSU5OCVFQiU5MCVBOSVFQiU4QiU4OCVFQiU4QiVBNC4lM0MlMkZwJTNF",
        request : [
            {
                title : 'URL',
                method: "GET",
                path: "/api/v1/franchisee/",
                host: "dapi.kakao.com",
                parameter : [
                    {
                        name : "page",
                        type : "int",
                        description : "페이지 번호",
                        required : "O"
                    },
                    {
                        name : "rowsNum",
                        type : "int",
                        description : "한 페이지 결과 수",
                        required : "O"
                    },
                    {
                        name : "bsnsNm",
                        type : "String",
                        description : "가맹점명",
                        required : "X"
                    },
                    {
                        name : "resultType",
                        type : "String",
                        description : `검색 결과 제공 방식
                        다음 중 하나 :
                        json, xml
                        (기본값 : json)`,
                        required : "X"
                    },
                ]
            }
        ],
        response : [
            {
                title : "franchisee",
                items : [
                    {
                        name : "businessNumber",
                        type : "String",
                        description : "사업자 번호"
                    },
                    {
                        name : "name",
                        type : "String",
                        description : "가맹점 이름"
                    },
                    {
                        name : "firstImg",
                        type : "String",
                        description : "가맹점 대표 이미지 경로"
                    },
                    {
                        name : "address",
                        type : "Address",
                        description : "가맹점 주소"
                    },
                    {
                        name : "name",
                        type : "String",
                        description : "가맹점 이름"
                    },
                    {
                        name : "x",
                        type : "String",
                        description : "경도"
                    },
                    {
                        name : "y",
                        type : "String",
                        description : "위도"
                    },
                    {
                        name : "tel",
                        type : "String",
                        description : "가맹점 대표 전화번호"
                    },
                    {
                        name : "ownerName",
                        type : "String",
                        description : "가맹점 대표자 이름"
                    },
                    {
                        name : "intro",
                        type : "String",
                        description : "가맹점 소개"
                    },
                    {
                        name : "createDate",
                        type : "String",
                        description : "가맹점 등록 날짜"
                    }
                ]
            }
        ]
    }
]

const encode = (string) => {
    return base64.encode(encodeURIComponent(string));
}

const decode = (encodeString) => {
    return decodeURIComponent(base64.decode(encodeString));
}

function ApiDocumentForm() {
    

    return (
        <Container>
            <div>
            <h3>
                가맹점 정보 검색
            </h3>
            <p>가맹점 정보를 제공하는 API입니다. 가맹점의 사업자번호, 가맹점 명, 주소, 좌표, 전화번호 등의 다양한 정보를 함께 제공합니다.</p>
            <p>발급 받은 JWT 토큰을 헤더에 담아 <code>GET</code>으로 요청합니다. 페이지 번호, 한 페이지 결과 수와 함께 결과 형식 파라미터의 값을 선택적으로 추가할 수 있습니다.</p>
            <p>응답은 <code>JSON</code>과 <code>XML</code> 형식을 지원합니다. 요청 시 파라미터의 <code>resultType</code> 부분에 원하는 응답 형식을 지정할 수 있습니다. 별도로 포맷을 지정하지 않은 경우 응답은 <code>JSON</code> 형식으로 반환됩니다.</p>

            <h4>
                Request
            </h4>
            <h5>URL</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                    <span className="http__method">GET  </span>
                    <span className="http__path">/api/v1/franchisee</span><br/>
                    <span className="key" >Host</span> : dapi.kakao.com<br/>
                    <span className="key" >Authorization</span> : bearer {'${JWT}'}
                </code>
            </pre>
            <h5>Parameter (리스트)</h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>Required</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>page</td>
                        <td><code>int</code></td>
                        <td>페이지 번호</td>
                        <td>O</td>
                    </tr>
                    <tr>
                        <td>rowsNum</td>
                        <td><code>int</code></td>
                        <td>한 페이지 결과 수</td>
                        <td>O</td>
                    </tr>
                    <tr>
                        <td>bsnsNm</td>
                        <td><code>String</code></td>
                        <td>가맹점명</td>
                        <td>X</td>
                    </tr>
                    <tr>
                        <td>resultType</td>
                        <td><code>String</code></td>
                        <td>
                            검색 결과 제공 방식<br/>
                            다음 중 하나 :<br/>
                            <code>json</code>,  <code>xml</code><br/>
                            (기본값 : <code>json</code>)
                        </td>
                        <td>X</td>
                    </tr>
                </tbody>
            </Table>

            <h4>
                Response 
            </h4>
            <h5>
                franchisee 
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>businessNumber</td>
                        <td><code>String</code></td>
                        <td>사업자 번호</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td><code>String</code></td>
                        <td>가맹점 이름</td>
                    </tr>
                    <tr>
                        <td>firstImg</td>
                        <td><code>String</code></td>
                        <td>가맹점 대표 이미지 경로</td>
                    </tr>
                    <tr>
                        <td>address</td>
                        <td><code><a href="#address-response">Address</a></code></td>
                        <td>가맹점 주소</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td><code>String</code></td>
                        <td>가맹점 이름</td>
                    </tr>
                    <tr>
                        <td>x</td>
                        <td><code>Double</code></td>
                        <td>경도</td>
                    </tr>
                    <tr>
                        <td>y</td>
                        <td><code>Double</code></td>
                        <td>위도</td>
                    </tr>
                    <tr>
                        <td>tel</td>
                        <td><code>String</code></td>
                        <td>가맹점 대표 전화번호</td>
                    </tr>
                    <tr>
                        <td>ownerName</td>
                        <td><code>String</code></td>
                        <td>가맹점 대표자 이름</td>
                    </tr>
                    <tr>
                        <td>intro</td>
                        <td><code>String</code></td>
                        <td>가맹점 소개</td>
                    </tr>
                    <tr>
                        <td>createDate</td>
                        <td><code>String</code></td>
                        <td>가맹점 등록 날짜</td>
                    </tr>
                </tbody>
            </Table>
            <h5>
                <a id="address-response"></a>
                Address
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>postalCode</td>
                        <td><code>String</code></td>
                        <td>우편번호</td>
                    </tr>
                    <tr>
                        <td>postalCode</td>
                        <td><code>String</code></td>
                        <td>우편번호</td>
                    </tr>
                    <tr>
                        <td>road</td>
                        <td><code>String</code></td>
                        <td>도로명</td>
                    </tr>
                    <tr>
                        <td>jibun</td>
                        <td><code>String</code></td>
                        <td>지번명</td>
                    </tr>
                    <tr>
                        <td>detail</td>
                        <td><code>String</code></td>
                        <td>상세주소</td>
                    </tr>
                </tbody>
            </Table>
            <h5>
                Error
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>message</td>
                        <td><code>String</code></td>
                        <td>에러 메세지</td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td><code>String</code></td>
                        <td>Http Status Code</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td><code>String</code></td>
                        <td>FM Service Error Code</td>
                    </tr>
                    <tr>
                        <td>detail</td>
                        <td><code>String</code></td>
                        <td>상세 메세지</td>
                    </tr>
                </tbody>
            </Table>

            <h4>
                Sample
            </h4>
            <h5>Request</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                    curl -X 
                    <span className="http__method">  GET</span>
                    <span className="http__path">  &quot;https://dapi.kakao.com/api/v1/franchisee?page=1&#38;rowsNum=5&quot;</span> \<br/>
                    - H  
                    <span className="http__path">  &quot;Authorization: Bearer <span className="variable">{'${JWT}'}</span>&quot;</span> \<br/>
                </code>
            </pre>
            <h5>Response</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                Content-Type: application/json;charset=UTF-8
                <JSONPretty data={franchiseeResponse}></JSONPretty>
                </code>
            </pre>
            </div>

            <div>
            <h3>
                가맹점 메뉴 검색
            </h3>
            <p>가맹점 메뉴를 제공하는 API입니다. 가맹점 메뉴의 이름, 가격, 이미지 경로, 소개 등의 정보를 제공합니다.</p>
            <p>발급 받은 JWT 토큰을 헤더에 담아 <code>GET</code>으로 요청합니다. 사업자 번호와 함께 결과 형식 파라미터의 값을 선택적으로 추가할 수 있습니다.</p>
            <p>응답은 <code>JSON</code>과 <code>XML</code> 형식을 지원합니다. 요청 시 파라미터의 <code>resultType</code> 부분에 원하는 응답 형식을 지정할 수 있습니다. 별도로 포맷을 지정하지 않은 경우 응답은 <code>JSON</code> 형식으로 반환됩니다.</p>

            <h4>
                Request
            </h4>
            <h5>URL</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                    <span className="http__method">GET  </span>
                    <span className="http__path">/api/v1/franchisee/<span className="variable">{'${businessNumber}'}</span>/menus</span><br/>
                    <span className="key" >Host</span> : dapi.kakao.com<br/>
                    <span className="key" >Authorization</span> : bearer {'${JWT}'}
                </code>
            </pre>
            <h5>Parameter</h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>Required</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>resultType</td>
                        <td><code>String</code></td>
                        <td>
                            검색 결과 제공 방식<br/>
                            다음 중 하나 :<br/>
                            <code>json</code>,  <code>xml</code><br/>
                            (기본값 : <code>json</code>)
                        </td>
                        <td>X</td>
                    </tr>
                </tbody>
            </Table>

            <h4>
                Response 
            </h4>
            <h5>
                menu 
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td><code>String</code></td>
                        <td>메뉴명</td>
                    </tr>
                    <tr>
                        <td>image</td>
                        <td><code><a href="#menu-image-response">Image</a></code></td>
                        <td>메뉴 이미지 정보</td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td><code>String</code></td>
                        <td>메뉴 설명</td>
                    </tr>
                    <tr>
                        <td>createDate</td>
                        <td><code>String</code></td>
                        <td>메뉴 등록 날짜</td>
                    </tr>
                </tbody>
            </Table>
            <h5>
                <a id="menu-image-response"></a>
                Image
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>path</td>
                        <td><code>String</code></td>
                        <td>이미지 경로</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td><code>String</code></td>
                        <td>이미지 크기 (byte)</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td><code>String</code></td>
                        <td>이미지명</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td><code>String</code></td>
                        <td>이미지 타입</td>
                    </tr>
                    <tr>
                        <td>createDate</td>
                        <td><code>String</code></td>
                        <td>메뉴 등록 날짜</td>
                    </tr>
                </tbody>
            </Table>
            <h5>
                Error
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>message</td>
                        <td><code>String</code></td>
                        <td>에러 메세지</td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td><code>String</code></td>
                        <td>Http Status Code</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td><code>String</code></td>
                        <td>FM Service Error Code</td>
                    </tr>
                    <tr>
                        <td>detail</td>
                        <td><code>String</code></td>
                        <td>상세 메세지</td>
                    </tr>
                </tbody>
            </Table>


            <h4>
                Sample
            </h4>
            <h5>Request</h5>
           
            <pre className="url__code">
                <code style={{color : 'white'}}>
                    curl -X 
                    <span className="http__method">  GET</span>
                    <span className="http__path">  &quot;https://dapi.kakao.com/api/v1/franchisee/<span className="variable">{'${businessNumber}'}</span>/menus&quot;</span> \<br/>
                    - H  
                    <span className="http__path">  &quot;Authorization: Bearer <span className="variable">{'${JWT}'}</span>&quot;</span> \<br/>
                </code>
            </pre>
            <h5>Response</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                Content-Type: application/json;charset=UTF-8
                <JSONPretty data={menuResponse}></JSONPretty>    
                </code>
            </pre>
            </div>

            <div>
            <h3>
                가맹점 이미지 검색
            </h3>
            <p>가맹점 이미지 정보를 제공하는 API입니다. 가맹점 이미지의 경로, 크기, 이름, 타입 등의 정보를 제공합니다.</p>
            <p>발급 받은 JWT 토큰을 헤더에 담아 <code>GET</code>으로 요청합니다. 사업자 번호와 함께 결과 형식 파라미터의 값을 선택적으로 추가할 수 있습니다.</p>
            <p>응답은 <code>JSON</code>과 <code>XML</code> 형식을 지원합니다. 요청 시 파라미터의 <code>resultType</code> 부분에 원하는 응답 형식을 지정할 수 있습니다. 별도로 포맷을 지정하지 않은 경우 응답은 <code>JSON</code> 형식으로 반환됩니다.</p>

            <h4>
                Request
            </h4>
            <h5>URL</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                    <span className="http__method">GET  </span>
                    <span className="http__path">/api/v1/franchisee/<span className="variable">{'${businessNumber}'}</span>/images</span><br/>
                    <span className="key" >Host</span> : dapi.kakao.com<br/>
                    <span className="key" >Authorization</span> : bearer {'${JWT}'}
                </code>
            </pre>
            <h5>Parameter</h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>Required</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>resultType</td>
                        <td><code>String</code></td>
                        <td>
                            검색 결과 제공 방식<br/>
                            다음 중 하나 :<br/>
                            <code>json</code>,  <code>xml</code><br/>
                            (기본값 : <code>json</code>)
                        </td>
                        <td>X</td>
                    </tr>
                </tbody>
            </Table>

            <h4>
                Response 
            </h4>
            <h5>
                Image
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>path</td>
                        <td><code>String</code></td>
                        <td>이미지 경로</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td><code>String</code></td>
                        <td>이미지 크기 (byte)</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td><code>String</code></td>
                        <td>이미지명</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td><code>String</code></td>
                        <td>이미지 타입</td>
                    </tr>
                    <tr>
                        <td>createDate</td>
                        <td><code>String</code></td>
                        <td>메뉴 등록 날짜</td>
                    </tr>
                </tbody>
            </Table>
            <h5>
                Error
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>message</td>
                        <td><code>String</code></td>
                        <td>에러 메세지</td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td><code>String</code></td>
                        <td>Http Status Code</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td><code>String</code></td>
                        <td>FM Service Error Code</td>
                    </tr>
                    <tr>
                        <td>detail</td>
                        <td><code>String</code></td>
                        <td>상세 메세지</td>
                    </tr>
                </tbody>
            </Table>

            <h4>
                Sample
            </h4>
            <h5>Request</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                    curl -X 
                    <span className="http__method">  GET</span>
                    <span className="http__path">  &quot;https://dapi.kakao.com/api/v1/franchisee/<span className="variable">{'${businessNumber}'}</span>/images&quot;</span> \<br/>
                    - H  
                    <span className="http__path">  &quot;Authorization: Bearer <span className="variable">{'${JWT}'}</span>&quot;</span> \<br/>
                </code>
            </pre>
            <h5>Response</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                Content-Type: application/json;charset=UTF-8
                <JSONPretty data={menuResponse}></JSONPretty>    
                </code>
            </pre>
            </div>

            <div>
            <h3>
                가맹점 영업시간 검색
            </h3>
            <p>가맹점 영업시간를 제공하는 API입니다. 가맹점 영업시간을 요일별로 제공합니다.</p>
            <p>발급 받은 JWT 토큰을 헤더에 담아 <code>GET</code>으로 요청합니다. 사업자 번호와 함께 결과 형식 파라미터의 값을 선택적으로 추가할 수 있습니다.</p>
            <p>응답은 <code>JSON</code>과 <code>XML</code> 형식을 지원합니다. 요청 시 파라미터의 <code>resultType</code> 부분에 원하는 응답 형식을 지정할 수 있습니다. 별도로 포맷을 지정하지 않은 경우 응답은 <code>JSON</code> 형식으로 반환됩니다.</p>

            <h4>
                Request
            </h4>
            <h5>URL</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                    <span className="http__method">GET  </span>
                    <span className="http__path">/api/v1/franchisee/<span className="variable">{'${businessNumber}'}</span>/schedule</span><br/>
                    <span className="key" >Host</span> : dapi.kakao.com<br/>
                    <span className="key" >Authorization</span> : bearer {'${JWT}'}
                </code>
            </pre>
            <h5>Parameter</h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>Required</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>resultType</td>
                        <td><code>String</code></td>
                        <td>
                            검색 결과 제공 방식<br/>
                            다음 중 하나 :<br/>
                            <code>json</code>,  <code>xml</code><br/>
                            (기본값 : <code>json</code>)
                        </td>
                        <td>X</td>
                    </tr>
                </tbody>
            </Table>

            <h4>
                Response 
            </h4>
            <h5>
                Schedule
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>monday</td>
                        <td><code>String</code></td>
                        <td>월요일 영업시간</td>
                    </tr>
                    <tr>
                        <td>thursday</td>
                        <td><code>String</code></td>
                        <td>화요일 영업시간</td>
                    </tr>
                    <tr>
                        <td>wednesday</td>
                        <td><code>String</code></td>
                        <td>수요일 영업시간</td>
                    </tr>
                    <tr>
                        <td>thursday</td>
                        <td><code>String</code></td>
                        <td>목요일 영업시간</td>
                    </tr>
                    <tr>
                        <td>friday</td>
                        <td><code>String</code></td>
                        <td>금요일 영업시간</td>
                    </tr>
                    <tr>
                        <td>saturday</td>
                        <td><code>String</code></td>
                        <td>일요일 영업시간</td>
                    </tr>
                    <tr>
                        <td>sunday</td>
                        <td><code>String</code></td>
                        <td>요일별 영업시간</td>
                    </tr>
                </tbody>
            </Table>
            <h5>
                Error
            </h5>
            <Table className="container__table">
                <thead>
                    <tr>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목명</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>타입</th>
                        <th style={{backgroundColor : '#e2e4ee'}}>항목설명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>message</td>
                        <td><code>String</code></td>
                        <td>에러 메세지</td>
                    </tr>
                    <tr>
                        <td>status</td>
                        <td><code>String</code></td>
                        <td>Http Status Code</td>
                    </tr>
                    <tr>
                        <td>code</td>
                        <td><code>String</code></td>
                        <td>FM Service Error Code</td>
                    </tr>
                    <tr>
                        <td>detail</td>
                        <td><code>String</code></td>
                        <td>상세 메세지</td>
                    </tr>
                </tbody>
            </Table>

            <h4>
                Sample
            </h4>
            <h5>Request</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                    curl -X 
                    <span className="http__method">  GET</span>
                    <span className="http__path">  &quot;https://dapi.kakao.com/api/v1/franchisee/<span className="variable">{'${businessNumber}'}</span>/schedule&quot;</span> \<br/>
                    - H  
                    <span className="http__path">  &quot;Authorization: Bearer <span className="variable">{'${JWT}'}</span>&quot;</span> \<br/>
                </code>
            </pre>
            <h5>Response</h5>
            <pre className="url__code">
                <code style={{color : 'white'}}>
                Content-Type: application/json;charset=UTF-8
                <JSONPretty data={scheduleResponse}></JSONPretty>    
                </code>
            </pre>
            </div>
        </Container>
    )
}


function ApiDocument() {
    return (
        <>
            <Header></Header>
            <ApiDocumentForm></ApiDocumentForm>
            <Footer></Footer>
        </>
    )
}

export default ApiDocument;