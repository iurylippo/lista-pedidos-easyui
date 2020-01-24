import React, { Component }from 'react';
import { DataGrid, GridColumn, GridColumnGroup, GridHeaderRow } from 'rc-easyui';
import dados from './dados';
import './PedidosLista.css';

class PedidosLista extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: dados
        }

    }
    
    

    render() {
        console.log(dados);
        return (
            <div className="PedidosLista">
                <h1>Lista de pedidos</h1>
                <DataGrid data={this.state.data} columnResizing  className="PedidosLista-DataGrid">
                    <GridColumnGroup frozen width={120}>
                        <GridHeaderRow>
                            <GridColumn field="pedidoNumero" title="Número"></GridColumn>
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
