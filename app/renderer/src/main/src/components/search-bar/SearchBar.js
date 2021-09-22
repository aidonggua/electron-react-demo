import '../../global.css'
import './SearchBar.css'
import {useState, useEffect} from "react";
import {Button, Col, Form, Input, Row, Select} from 'antd'

const {ipcRenderer} = window.require('electron')

const {Option} = Select

function SearchBar() {
    let [sector, setSector] = useState([])
    let [stockA, setStockA] = useState('')
    let [stockB, setStockB] = useState('')
    let [stockC, setStockC] = useState('')
    let [sectorList, setSectorList] = useState([])

    const findAllSectors = async () => {
        const res = await ipcRenderer.invoke('find-all-sectors')
        setSectorList(res)
    }

    useEffect(() => {
        findAllSectors()
        console.log('send channel: find-all-sectors')
    }, [sectorList.length])

    const options = []
    if (sectorList) {
        console.log(sectorList)
        for (const item of sectorList) {
            options.push(<Option key={item.sectorName} value={item.sectorName}>{item.sectorName}</Option>)
        }
    }

    return (
        <div className="search-bar">
            <Row gutter={[10, 10]}>
                <Col span={4}>
                    <Select className="sector-selector" placeholder="板块" defaultValue={sector} onChange={(v) => setSector(v)}>
                        {options}
                    </Select>
                </Col>
                <Col span={4}>
                    <Input placeholder="股票A" onChange={(e) => setStockA(e.target.value)}/>
                </Col>
                <Col span={4}>
                    <Input placeholder="股票B" onChange={(e) => setStockB(e.target.value)}/>
                </Col>
                <Col span={4}>
                    <Input placeholder="股票C" onChange={(e) => setStockC(e.target.value)}/>
                </Col>
                <Col span={8}>
                    <Button style={{marginRight: 10}} onClick={() => {
                        // console.log(findAllSectors())
                    }}>快速比较</Button>
                    <Button onClick={() => console.log(sector)}>清空</Button>
                </Col>
            </Row>
        </div>
    );
}

export default SearchBar;
