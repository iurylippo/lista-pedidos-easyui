import React, { Component }from 'react';
import { DataGrid, GridColumn, GridColumnGroup, GridHeaderRow } from 'rc-easyui';
import {dados, footer} from './dados';
import './PedidosLista.css';

class PedidosLista extends Component {
    constructor(props) {
        super(props);
        this.state = {
          total: 0,
          pageNumber: 1,
          pageSize: 10,
          data: [],
          loading: false,
          pagePosition: "bottom",
          pageOptions: {
            layout: ['list', 'sep', 'first', 'prev', 'next', 'last', 'sep', 'refresh', 'sep', 'manual', 'info']
          },
          footerData: footer,
        }
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

      getData(pageNumber, pageSize) {
        let total = dados.length;
        let data = [];
        let start = (pageNumber - 1) * pageSize;
        
        for (let i = start + 1; i <= start + pageSize; i++) {
            if(i > total) {
                break;
            }
            console.log(dados[i-1]);
            data.push(dados[i-1]);
        }

        return {
          total: total,
          pageNumber: pageNumber,
          pageSize: pageSize,
          rows: data
        };
      }

    handlePageChange(event) {
    this.loadPage(event.pageNumber, event.pageSize)
    }

    render() {
        return (
            <div className="PedidosLista">
                <DataGrid 
                    showFooter
                    data={this.state.data} 
                    footerData={this.state.footerData}
                    className="PedidosLista-DataGrid"
                    columnResizing  
                    pagination
                    lazy
                    {...this.state}
                    onPageChange={this.handlePageChange.bind(this)}
                    >
                    <GridColumnGroup frozen width={310}>
                        <GridHeaderRow>
                            <GridColumn field="rn" align="center" width="30px"
                                cellCss="datagrid-td-rownumber"
                                render={({rowIndex}) => (
                                <span>{rowIndex+1}</span>
                                )}
                            />
                            <GridColumn field="titulo"title="Gerar PDF" width={80}></GridColumn>
                            <GridColumn field="total" title="Exportar" width={80}></GridColumn>
                            <GridColumn field="pedidoNumero" title="Número" width={120}></GridColumn>
                        </GridHeaderRow>
                    </GridColumnGroup>
                    <GridColumnGroup>
                        <GridHeaderRow>
                            <GridColumn colspan={2} title="Cliente" align="center"></GridColumn>
                            <GridColumn rowspan={2} field="pedidoGrupoResp" title="Grupo Resp." width={150}></GridColumn>
                            <GridColumn colspan={2} title="Vendedor" align="center"></GridColumn>
                            <GridColumn rowspan={2} field="pedidoData" title="Data Ped." width={100}></GridColumn>
                            <GridColumn rowspan={2} field="pedidoHora" title="Hora Ped." width={80}></GridColumn>
                            <GridColumn rowspan={2} field="pedidoEnvio" title="Envio Ped." width={80}></GridColumn>
                            <GridColumn rowspan={2} field="pedidoStatus" title="Status" width={100}></GridColumn>
                            <GridColumn rowspan={2} field="pedidoValor" title="Valor" width={80}></GridColumn>
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
                            <GridColumn field="unidadeFaturamentoCodigo" title="Código" width={200}></GridColumn>
                            <GridColumn field="unidadeFaturamentoDescricao" title="Descrição" width={200}></GridColumn>
                            <GridColumn field="pedidoNumeroErp" title="Número Erp" width={120}></GridColumn>
                            <GridColumn field="pedidoExportadoErp" title="Exportado" width={80}></GridColumn>
                        </GridHeaderRow>
                    </GridColumnGroup>
                </DataGrid>
            </div>
        )
    }
}


export default PedidosLista;
