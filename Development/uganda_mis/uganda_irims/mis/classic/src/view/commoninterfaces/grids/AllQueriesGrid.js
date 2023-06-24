/**
 * Created by Softclans on 11/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.grids.AllQueriesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'allqueriesgrid',
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
        fieldLabel: 'Query Category',
        labelWidth: 150,
        width: 400,
        valueField: 'id',
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
        fieldLabel: 'Query Status',
        labelWidth: 150,
        width: 400,
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
    export_title: 'Queries',
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
    }, {
        ftype: 'grouping',
        startCollapsed: false,
        //groupHeaderTpl: 'Checklist Type: {[values.rows[0].data.checklist_type]}, Checklist Item: {[values.rows[0].data.checklist_item_name]} [{rows.length} {[values.rows.length > 1 ? "queries" : "query"]}]',
        groupHeaderTpl: 'Checklist Category: {[values.rows[0].data.checklist_category]} [{rows.length} {[values.rows.length > 1 ? "queries" : "query"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'checklist_category_id',
                storeId: 'allQueriesViewGridStr',
                /*grouper: {
                    groupFn: function (item) {
                        return item.get('checklist_category_id') + item.get('checklist_item_id');
                    }
                },*/
                proxy: {
                    url: 'api/getAllApplicationQueries'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                is_manager_query = grid.down('hiddenfield[name=is_manager_query]').getValue();
            if ((is_manager_query) && is_manager_query > 0) {
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                     {
                        text: 'Review Query',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Review Query for Acceptance and invoicing if applicable',
                        action: 'preview',
                        childXtype: 'applicationRaiseQueryPnl',
                        winTitle: 'Query',
                        winWidth: '70%',
                        handler: 'showPreviewApplicationManagerQueryPnl',
                        stores: '[]',
                        // hidden: true
                    },{
                        text: 'Print Query Letter',
                        iconCls: 'x-fa fa-print',
                        tooltip: 'Preview query Letter',
                        action: 'preview_query',
                        handler: 'showPreviewQueryLetter',
                        stores: '[]',
                        // hidden: true
                    },{
                        text: 'Add Comment',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        childXtype: 'applicationRaiseQueryPnl',
                        winTitle: 'Query',
                        winWidth: '35%',
                        //handler: 'showEditApplicationManagerQueryForm',
                        // handler: 'addManagerCommenttoQuery',
                        stores: '[]',
                        hidden: true
                    },{
                        text: 'Close Query',
                        iconCls: 'x-fa fa-check',
                        table_name: 'checklistitems_queries',
                        storeID: 'applicationqueriesstr',
                        action: 'close_query',
                        action_url: 'api/closeApplicationQuery',
                        handler: 'closeApplicationQuery',
                        // hidden: true
                    }];
            } else {
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Previous Responses',
                        iconCls: 'x-fa fa-exchange',
                        disabled: true,
                        hidden: true,
                        handler: 'showQueryPrevResponses',
                        stores: '[]'
                    }, {
                        text: 'Re-Query',
                        iconCls: 'x-fa fa-reply',
                        action: 're_query',
                        handler: 'showReQueryApplicationQueryForm',
                        stores: '[]',
                        hidden: true
                    },{
                        text: 'Print Query Letter',
                        iconCls: 'x-fa fa-print',
                        tooltip: 'Preview query Letter',
                        action: 'preview_query',
                        handler: 'showPreviewQueryLetter',
                        stores: '[]',
                        // hidden: true
                    }, {
                        text: 'Edit Query',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        childXtype: 'applicationRaiseQueryPnl',
                        winTitle: 'Query',
                        winWidth: '35%',
                        handler: 'showEditApplicationManagerQueryForm',
                        stores: '[]',
                        hidden: true
                    }, {
                        text: 'Delete Query',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'checklistitems_queries',
                        storeID: 'applicationqueriesstr',
                        action_url: 'api/deleteCommonRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteCommonParamWidgetParam',
                        disabled: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete'),
                        hidden: true
                    } ,{
                        text: 'Close Query',
                        iconCls: 'x-fa fa-check',
                        table_name: 'checklistitems_queries',
                        storeID: 'applicationqueriesstr',
                        action: 'close_query',
                        action_url: 'api/closeApplicationQuery',
                        handler: 'closeApplicationQuery',
                        hidden: true
                    },];
            }
        }
    },
    columns: [{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'checklist_category',
        text: 'Query Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_type',
        text: 'Query Type',
        width: 100,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_remark',
        text: 'Query Remarks',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'queried_by',
        text: 'Queried By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'queried_on',
        text: 'Queried On',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manager_remark',
        text: 'Manager Remark',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_status',
        text: 'Status',
        flex: 1,
        renderer: function (value, metaData, record) {
            var status_id = record.get('status');
            if (status_id === 1) {
                metaData.tdStyle = 'color:white;background-color:red';
                return value;
            }
			else if(status_id === 2){
				 metaData.tdStyle = 'color:white;background-color:blue';
            return value;
			}
			else{
				metaData.tdStyle = 'color:white;background-color:green';
            return value;
			}
            
        }
    }, {
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
        }, onWidgetAttach: function (col, widget, rec) {
            var status = rec.get('status'),
                grid = widget.up('grid'),
                invoice_id = rec.get('invoice_id'),
                is_manager_query = grid.down('hiddenfield[name=is_manager_query]').getValue();

            if ((is_manager_query) && is_manager_query > 0) {
                if (status === 1 || status == 1) {//open
                    //widget.down('menu menuitem[action=edit]').setVisible(true);
                    //widget.down('menu menuitem[action=re_query]').setVisible(false);
                    if(invoice_id){
                        widget.down('menu menuitem[action=close_query]').setVisible(false);
                    }else{
                        widget.down('menu menuitem[action=close_query]').setVisible(true);
                    }
                   
                }
                if (status === 2 || status == 2) {//responded
                    //widget.down('menu menuitem[action=re_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                    widget.down('menu menuitem[action=preview]').setVisible(false);
                }
                if (status == 4 || status === 4) {//closed
                    //widget.down('menu menuitem[action=re_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(false);
                    widget.down('menu menuitem[action=preview]').setVisible(false);
                
                }
            } else {
                if (status === 1 || status == 1) {//open
                    widget.down('menu menuitem[action=actual_delete]').setVisible(true);
                    widget.down('menu menuitem[action=edit]').setVisible(true);
                    widget.down('menu menuitem[action=preview_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                }
                if (status === 2 || status == 2) {//responded
                    widget.down('menu menuitem[action=re_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                    widget.down('menu menuitem[action=actual_delete]').setVisible(false);
                    widget.down('menu menuitem[action=edit]').setVisible(false);
                }
                if (status == 3 || status === 3) {//re queried
                    //widget.down('menu menuitem[action=re_query]').setVisible(false);
                }
                if (status == 4 || status === 4) {//closed
                    widget.down('menu menuitem[action=edit]').setVisible(false);
                    widget.down('menu menuitem[action=re_query]').setVisible(false);
                    widget.down('menu menuitem[action=close_query]').setVisible(false);
                }
            }
        }
    }]
});
