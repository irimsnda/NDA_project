
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ApplicationPermitsDeclarationsDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'applicationpermitsdeclarationsdashgrid',
    itemId: 'applicationpermitsdeclarationsdashgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    plugins: [
        {
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
    tbar:[{
        xtype: 'form',
        ui: 'footer',
        style :'margin-bottom: 0px;',
        width: '100%',
        layout: {
            type:'column',
            columnWidth: 0.33
        },
        defaults:{
          bodyPadding: 1,
          labelAlign:'top',
          width: 320,
          margins: 5
          },
         items: [{
            xtype: 'combo',
            fieldLabel: 'Sub Module',
            labelWidth: 80,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            name: 'sub_module_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setWorkflowCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'workflow/getSystemSubModules',
                            extraParams: {
                                model_name: 'SubModule',
                                module_id: 20
                            }
                        }
                    },
                    isLoad: true
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },{ 
                xtype:'datefield',format:'Y-m-d',
                name: 'received_from',
                fieldLabel:'Received From'
            },{ 
                xtype:'datefield',
                name: 'received_to',format:'Y-m-d',
                fieldLabel:'Received To'
            },{ 
                xtype:'datefield',
                name: 'permit_approval_from',format:'Y-m-d',
                fieldLabel:'Permit Approval From'
            },{ 
                xtype:'datefield',
                name: 'permit_approval_to',format:'Y-m-d',
                fieldLabel:'Permit Approval To'
            }],
            buttons:[{
                ui:'soft-green',
                text:'Filter Permits',
                margin: 5,
                handler: 'funcFilterPermitsdeclarations'
            },{
                ui:'soft-red',
                text:'Clear Filter',
                margin: 5,
                handler: 'funcClearFilterPermitsdeclarations'
            }]
    }],
    export_title: 'Permits applications',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype:'grouping',
        enableGroupingMenu: true,
        groupHeaderTpl: 'Permits Submission Status: {[values.rows[0].data.permitsubmission_status]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
    }],
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        hidden: true,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Process Permit Declaration',
            iconCls: 'x-fa fa-edit',
            handler: 'funcProcessPermitDeclaration'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'referenceNumber',
        text: 'Declaration Reference No',
        tdCls:'wrap-text',
        flex: 1,filter: {
            xtype: 'textfield'
        },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tansadNumber',
        text: 'Tansad Number',
        tdCls:'wrap-text',
        flex: 1,filter: {
            xtype: 'textfield'
        },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permitsubmission_status',
        text: 'Permits Submission Status',
        tdCls:'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference Number',
        tdCls:'wrap-text',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        tdCls:'wrap-text',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'processed_on',
        text: 'Date Processed',
        tdCls:'wrap-text'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        text: 'Date Received',
        tdCls:'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permit_approval_date',
        text: 'Permit Approval Date',
        hidden: true,
        tdCls:'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approval_recommendation',
        text: 'Approval Recommendation',
        hidden: true,
        tdCls:'wrap-text'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'arrivalDate',
        hidden: true,
        text: 'Consignment Arrival Date', tdCls:'wrap-text',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'clearingAgents',
        text: 'Clearing Agent', tdCls:'wrap-text',
        flex: 1,filter: {
            xtype: 'textfield'
        },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'importer',
        text: 'Importer', tdCls:'wrap-text',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'exporter',
        text: 'Exporter', tdCls:'wrap-text',
        flex: 1,
        filter: {
            xtype: 'textfield'
        },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'consignmentCountryCode',
        text: 'Consignment Country Code', tdCls:'wrap-text',
        flex: 1,filter: {
            xtype: 'textfield'
        },
    }, {
        xtype: 'gridcolumn',
        text: 'Destination',
        dataIndex: 'destinationCountryCode', tdCls:'wrap-text',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Proforma Invoice No', tdCls:'wrap-text',
        dataIndex: 'invoiceNumber',
        flex: 1,
        tdCls: 'wrap',
        filter: {
            xtype: 'textfield'
        },
    },
    {
        xtype: 'gridcolumn',
        text: 'Proforma Invoice Date', 
        tdCls:'wrap-text',
        dataIndex: 'invoiceDate',
        flex: 1,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        text: 'Proforma Currency',
        dataIndex: 'currencyCode', tdCls:'wrap-text',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn', hidden: true,
        text: 'Inspected on', tdCls:'wrap-text',
        dataIndex: 'inspected_on',
        flex: 1,
        tdCls: 'wrap'
    }],
    listeners: {
       
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                groupField:'permitsubmission_status',
                storeId: 'applicationpermitsdeclarationsdashgridstr',
                enablePaging: true,
                remoteFilter: true,
                proxy: {
                    url: 'importexportpermits/getImportExportPermitDeclarations',
                    reader: {
                        type: 'json',
                        rootProperty: 'results',
                        totalProperty: 'totals'
                    }
                }
            },
            isLoad: true,
            autoLoad: true
        },
        itemdblclick: 'onViewDeclaredPermitApplication'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){

            var grid = this.up('grid'),
              sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
              received_from = grid.down('datefield[name=received_from]').getValue(),
              received_to = grid.down('datefield[name=received_to]').getValue(),
              permit_approval_from = grid.down('datefield[name=permit_approval_from]').getValue(),
              permit_approval_to = grid.down('datefield[name=permit_approval_to]').getValue(),
              store = grid.getStore(); 
            store.removeAll();
            store.getProxy().extraParams = {
                  'sub_module_id': sub_module_id,
                  'received_from': received_from,
                  'received_to': received_to,
                  'permit_approval_from': permit_approval_from,
                  'permit_approval_to':permit_approval_to
            }
      }
    }]
});
