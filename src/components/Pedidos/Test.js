import React from 'react';
import { DataGrid, GridColumn, GridColumnGroup, GridHeaderRow, CheckBox } from 'rc-easyui';
import {dados, footer} from './dados';
import './PedidosLista.css';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: false,
      rowClicked: false,
      data: [],
      footerData: this.getFooterData(),
      pagePosition: "bottom",
      pageOptions: {
      layout: ['list', 'sep', 'first', 'prev', 'next', 'last', 'sep', 'refresh', 'sep', 'manual', 'info']
      },
      total: 0,
      pageNumber: 1,
      pageSize: 10,
    }
  }

  getData(pageNumber, pageSize) {
    let total = dados.length;
    let data = [];
    let start = (pageNumber - 1) * pageSize;
    
    for (let i = start + 1; i <= start + pageSize && i <= total; i++) {
        data.push(dados[i-1]);
    }

    return {
        total: total,
        pageNumber: pageNumber,
        pageSize: pageSize,
        rows: data
    };
  }

  getFooterData() {
      return footer;
  }

  componentDidMount() {
    this.loadPage(this.state.pageNumber, this.state.pageSize)
  }

  loadPage(pageNumber, pageSize) {
    this.setState({ loading: true })
    setTimeout(() => {
      let result = this.getData(pageNumber, pageSize);
      this.setState(Object.assign({}, result, {
        data: result.rows,
        loading: false
      }))
    }, 1000);
  }

  handlePageChange(event) {
    this.loadPage(event.pageNumber, event.pageSize)
  }

  handleRowCheck(row, checked) {
    let data = this.state.data.slice();
    let index = this.state.data.indexOf(row);
    data.splice(index, 1, Object.assign({}, row, { selected: checked }));
    let checkedRows = data.filter(row => row.selected);
    this.setState({
      allChecked: data.length === checkedRows.length,
      rowClicked: true,
      data: data
    }, () => {
      this.setState({ rowClicked: false })
    });
  }

  handleAllCheck(checked) {
    if (this.state.rowClicked) {
      return;
    }
    let data = this.state.data.map(row => {
      return Object.assign({}, row, { selected: checked })
    });
    this.setState({
      allChecked: checked,
      data: data
    })
  }

  render() {
    const checkedItems = this.state.data.filter(row => row.selected).map(row => row.pedidoNumero);
    return (
      <div className="PedidosLista">
        <h2>Listagem de Pedidos</h2>
        <div className="PedidosLista-btn-container">
            <button>Gerar PDF</button>
            <button>Exportar</button>
            <button>Aprovar</button>
            <button>Editar</button>
            <button>Cancelar</button>
            <button>Visualizar</button>
        </div>
        <DataGrid 
            data={this.state.data}
            footerData={this.state.footerData}
            className="PedidosLista-DataGrid"
            showFooter
            columnResizing
            pagination
            lazy
            {...this.state}
            onPageChange={this.handlePageChange.bind(this)}
        >
          
          <GridColumnGroup frozen width={230}>
                <GridHeaderRow className="PedidosLista-GridColumnGroup">
                    <GridColumn field="rn" align="center" width={40}
                        cellCss="datagrid-td-rownumber"
                        render={({rowIndex}) => (
                        <span>{rowIndex+1}</span>
                        )}
                    />
                    <GridColumn width={50} align="center"
                        field="ck"
                        render={({ row }) => (
                        <CheckBox checked={row.selected} onChange={(checked) => this.handleRowCheck(row, checked)}></CheckBox>
                        )}
                        header={() => (
                        <CheckBox checked={this.state.allChecked} onChange={(checked) => this.handleAllCheck(checked)}></CheckBox>
                        )}
                    />
                    <GridColumn field="pedidoNumero" title="Número" width={140}></GridColumn>
                </GridHeaderRow>
            </GridColumnGroup>
            <GridColumnGroup>
                <GridHeaderRow>
                    <GridColumn colspan={2} title="Cliente" align="center"></GridColumn>
                    <GridColumn rowspan={2} field="pedidoGrupoResp" title="Grupo Resp." width={150}></GridColumn>
                    <GridColumn colspan={2} title="Vendedor" align="center"></GridColumn>
                    <GridColumn rowspan={2} field="pedidoData" title="Data Ped." width={120}></GridColumn>
                    <GridColumn rowspan={2} field="pedidoHora" title="Hora Ped." width={100}></GridColumn>
                    <GridColumn rowspan={2} field="pedidoEnvio" title="Envio Ped." width={100}></GridColumn>
                    <GridColumn rowspan={2} field="pedidoStatus" title="Status" width={140}></GridColumn>
                    <GridColumn rowspan={2} field="pedidoValor" title="Valor" width={120}></GridColumn>
                    <GridColumn colspan={2} title="Canal Cliente" align="center"></GridColumn>
                    <GridColumn rowspan={2} field="pedidoTipo" title="Tipo Ped." width={80}></GridColumn>
                    <GridColumn rowspan={2} field="pedidoVerba" title="Verba" width={80}></GridColumn>
                    <GridColumn colspan={2} title="Unidade Faturamento" align="center"></GridColumn>
                    <GridColumn colspan={2} title="Informações Erp" align="center"></GridColumn>
                </GridHeaderRow>
                <GridHeaderRow>
                    <GridColumn field="clienteCodigo" title="Codigo" width={120}></GridColumn>
                    <GridColumn field="clienteRazaoSocial" title="Razão Social" width={200}></GridColumn>
                    <GridColumn field="vendedorCodigo" title="Código" width={120}></GridColumn>
                    <GridColumn field="vendedorNome" title="Nome" width={200}></GridColumn>
                    <GridColumn field="clienteCodigoCanal" title="Código" width={80}></GridColumn>
                    <GridColumn field="clienteDescricaoCanal" title="Descrição" width={200}></GridColumn>
                    <GridColumn field="unidadeFaturamentoCodigo" title="Código" width={80}></GridColumn>
                    <GridColumn field="unidadeFaturamentoDescricao" title="Descrição" width={200}></GridColumn>
                    <GridColumn field="pedidoNumeroErp" title="Número Erp" width={120}></GridColumn>
                    <GridColumn field="pedidoExportadoErp" title="Exportado" width={80}></GridColumn>
                </GridHeaderRow>
            </GridColumnGroup>
        </DataGrid>
        <p>Checked Items: {checkedItems.join(', ')}</p>
      </div>
    );
  }
}
 
export default App;