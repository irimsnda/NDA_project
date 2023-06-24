/**
 * Created by Softclans on 11/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.grids.ReInspectionsRequestsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'reinspectionsrequestsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 500,
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
    tbar: [{
        xtype: 'button',
        text: 'Add Re-Inspection Re-Request',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_query',
        childXtype:'applicationReinspectionRequestPnl',
        storeID: 'reinspectionsrequestsgridstr',
        win_title: 'Re-Inspection Request',
        handler: 'showAddApplicationQueryForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'is_manager_query'
    }, {
        xtype: 'hiddenfield',
        name: 'is_manager_query_response'
    }, {
        xtype: 'hiddenfield',
        name: 'item_resp_id'
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    }, {
        xtype: 'hiddenfield',
        name: 'last_query_ref_id'
    },{
        xtype: 'hiddenfield',
        name: 'assessment_procedure_id'
    },{
        xtype: 'hiddenfield',
        name: 'classification_id'
    },{
        xtype: 'hiddenfield',
        name: 'prodclass_category_id'
    },{
        xtype: 'hiddenfield',
        name: 'product_subcategory_id'
    },{
        xtype: 'hiddenfield',
        name: 'product_origin_id'
    },{
        xtype: 'hiddenfield',
        name: 'application_status_id'
    },{
        xtype: 'hiddenfield',
        name: 'application_id'
    },{
        xtype: 'combo',
        fieldLabel: 'CAPA Category',
        labelWidth: 150,
        width: 400,
        valueField: 'id',
        hidden: true,
        displayField: 'name',
        forceSelection: true,
        name: 'category_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'ChecklistCategory'
                        }
                    }
                },
                isLoad: true
            },
            change: function () {
                var store = this.up('grid').getStore();
                store.load();
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
        xtype: 'combo',
        fieldLabel: 'CAPA Status',
        labelWidth: 150,
        width: 400, hidden: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'status_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_query_statuses'
                        }
                    }
                },
                isLoad: true
            },
            change: function () {
                var store = this.up('grid').getStore();
                store.load();
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
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'CAPA Requests',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                workflow_stage_id = grid.down('hiddenfield[name=workflow_stage_id]').getValue(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                module_id = grid.down('hiddenfield[name=module_id]').getValue(),
                sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
                section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                
                last_query_ref_id = grid.down('hiddenfield[name=last_query_ref_id]').getValue(),
                status_id = grid.down('combo[name=status_id]').getValue(),
                checklist_category = grid.down('combo[name=category_id]').getValue(),
                
                is_manager_query = grid.down('hiddenfield[name=is_manager_query]').getValue();
                store.getProxy().extraParams = {
                    workflow_stage_id: workflow_stage_id,
                    application_code: application_code,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    status_id: status_id,
                    checklist_category: checklist_category,
                    is_manager_query: is_manager_query,
                    last_query_ref_id: last_query_ref_id
                };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'checklist_category_id',
                storeId: 'reinspectionsrequestsgridstr',
                proxy: {
                    url: 'api/getAllReinspectionInspectionsRequests'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this;
            
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Edit RE-Inspection',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        childXtype: 'applicationReinspectionRequestPnl',
                        winTitle: 'Query',
                        winWidth: '70%',
                        handler: 'showEditREinspectionRequstestForm',
                        stores: '[]'
                    },{
                        text: 'Previous Responses',
                        iconCls: 'x-fa fa-exchange',
                        disabled: true,
                        hidden: true,
                        handler: 'showQueryPrevResponses',
                        stores: '[]'
                    }, {
                        text: 'Print Re-Inspection Request Letter',
                        iconCls: 'x-fa fa-print',
                        tooltip: 'Preview query Letter',
                        action: 'preview_query',
                        handler: 'showPreviewREinspectionueryLetter',
                        stores: '[]'
                    }];
           
        }
    },
    columns: [{
        xtype: 'rownumberer'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_ref',
        text: 'Inspection Request Ref',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comments',
        text: 'Re-Inspection Remarks',
        tdCls: 'wrap',
        flex: 0.5
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'queried_by',
        text: 'Request Raised By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'queried_on',
        text: 'Request Raised On',
        flex: 0.5
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manager_remark',
        text: 'Manager Remark',
        tdCls: 'wrap',
        hidden: true,
        flex: 1
    },{
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
                items: []
            }
        }
    }]
});
