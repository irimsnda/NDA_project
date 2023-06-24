/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportPremisesValidationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'importexportpremisesvalidationgrid',
    listeners: {
        
    },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitmanagersubstr',
                proxy: {
                    url: 'importexportpermits/getImportExportManagerReviewApplications'
                }
            },
            isLoad: false
        },
        
        deselect: function (sel, record, index, eOpts) {
            
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
            
        }
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    },'->',{
        xtype: 'combo',
        fieldLabel: 'Zones',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        labelAlign : 'top',
        displayField: 'name',
        name: 'zone_id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
             beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_zones'
                    }
                   }
                },
                isLoad: true
            },
           beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));	
                    }
        }
    }],
    
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        text: 'Has Licensed Premises', 
        dataIndex: 'certificate_no',
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Registered/Licensed";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Not Registered";
        }

    },{
        xtype: 'gridcolumn',
        text: 'Premises Name',
        dataIndex: 'premises_name',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        text: 'Premises Physical Address',
        dataIndex: 'prem_physical_address',
        flex: 1,
        tdCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        text: 'Premises Registration No',
        dataIndex: 'premise_reg_no',
        flex: 1,
        tdCls: 'wrap'
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premises_validation_recommendation',
        text: 'Premises Validation Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'products_validation_recommendation',
        text: 'Products Validation Recommendation',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Premises Validation Recommendation',
            iconCls: 'x-fa fa-certificate',
            name: 'certificate',
            childXtype: 'importexportpremisesvalidationfrm',
            winTitle:'Premises Validation Recomendation',
            winWidth: '60%',
            handler: 'funcPremisesValidationrecommendation'
        }
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                        text: 'Preview Import/Export Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'editpreviewPermitinformation'
                    },{
                        text: 'All Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        document_type_id: '',
                        hidden: true,
                        handler: 'showPreviousUploadedDocs'
                    },{
                        text: 'View Screening Checklists & Recommendation',
                        iconCls: 'x-fa fa-check-square',hidden: true,
                        handler: 'showApplicationChecklists'
                    }
                ]
            }
        }
    }]
});