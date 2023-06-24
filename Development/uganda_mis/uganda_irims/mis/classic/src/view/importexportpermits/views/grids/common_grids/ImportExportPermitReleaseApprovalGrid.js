/**

 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitReleaseApprovalGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'importexportpermitreleaseapprovalgrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpermitreleasegridStr',
                proxy: {
                    url: 'importexportpermits/getImportExportApprovedPermit'
                }
            },
            isLoad: true,
            autoLoad: true
        },select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('release_recommendation_id');
            if (recommendation_id > 0) {
               return true;
            } else {
               return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        }
    },
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('release_recommendation_id');
            if (recommendation_id > 0) {
                return 'valid-row';
            } else {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
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
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
   
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Print/Preview Permit',
            iconCls: 'x-fa fa-certificate',
            name: 'certificate',
            handler: 'generateColumnImportExportPermit'
        }
    },{
        xtype: 'widgetcolumn',
        width: 120,
        hidden: true,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Permit Release Recommendation',
            iconCls: 'x-fa fa-chevron-circle-up',
            approval_frm: 'permitReleaseRecommFrm',
            handler: 'getPermitReleaseRecommendationDetails',
        }
    },{
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
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'premises_name',
        text: 'Premises Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'prechecking_recommendation',
        text: 'Prechecking Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Review Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'release_recommendation',
        text: 'Permit Release Recommendation',
        flex: 1
    },  {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Permit Release Recommendation',
                    iconCls: 'x-fa fa-chevron-circle-up',
                    handler: 'getPermitReleaseRecommendationDetails',
                    approval_frm:'permitReleaseRecommFrm',
                    vwcontroller: '',
                    stores: '[]',
                    table_name: 'tra_importexport_applications'
                },
                    {
                        text: 'Print/Preview Permit',
                        iconCls: 'x-fa fa-certificate',
                        handler: '',
                        name: 'certificate',
                        handler: 'generateImportExportPermit'
                    },
                    {
                        text: 'Preview Import/Export Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'editpreviewPermitinformation'
                    }
                ]
            }
        }
    }]
});