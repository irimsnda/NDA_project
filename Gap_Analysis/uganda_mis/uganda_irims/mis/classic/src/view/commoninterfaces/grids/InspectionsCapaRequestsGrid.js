/**
 * Created by Softclans on 11/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.grids.InspectionsCapaRequestsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'inspectionscaparequestsgrid',
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
        text: 'Add CAPA Re-Request',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_query',
        childXtype:'applicationRaiseCAPAPnl',
        storeID: 'inspectionscaparequestsgridstr',
        win_title: 'CAPA Request',
        handler: 'showAddApplicationCapaForm',
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
    export_title: 'CAPA Requests',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            grid = this.up('grid');
            this.up('grid').fireEvent('refresh',grid);

        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: 'CAPA Category: {[values.rows[0].data.checklist_category]} [{rows.length} {[values.rows.length > 1 ? "queries" : "CAPA Requests"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'checklist_category_id',
                storeId: 'inspectionscaparequestsgridstr',
                proxy: {
                    url: 'api/getAllInspectionsCaparequests'
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
                        text: 'Edit CAPA',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        childXtype: 'applicationRaiseCAPAPnl',
                        winTitle: 'EDIT CAPA Details',
                        winWidth: '90%',
                        handler: 'showEditApplicationCAPAForm',
                        stores: '[]',
                        hidden: true
                    },{
                        text: 'Add Comment',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        childXtype: 'applicationRaiseCAPAPnl',
                        winTitle: 'Query',
                        winWidth: '35%',
                        stores: '[]',
                        hidden: true
                    },{
                        text: 'Print Feedback Letter',
                        iconCls: 'x-fa fa-print',
                        tooltip: 'Preview query Letter',
                        action: 'preview_query',
                        handler: 'showPreviewCAPAQueryLetter',
                        stores: '[]',
                        // hidden: true
                    }, {
                        text: 'Close CAPA',
                        iconCls: 'x-fa fa-check',
                        table_name: 'checklistitems_queries',
                        storeID: 'applicationqueriesstr',
                        action: 'close_query',
                        action_url: 'api/closeApplicationCAPA',
                        handler: 'closeApplicationCAPAREquest',
                        // hidden: true
                    }];
            } else {
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Edit CAPA',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        childXtype: 'applicationRaiseCAPAPnl',
                        winTitle: 'Query',
                        winWidth: '70%',
                        handler: 'showEditApplicationCAPAForm',
                        stores: '[]',
                        hidden: true
                    },{
                        text: 'Previous Responses',
                        iconCls: 'x-fa fa-exchange',
                        disabled: true,
                        hidden: true,
                        handler: 'showQueryPrevResponses',
                        stores: '[]'
                    }, {
                        text: 'Print Feedback Letter',
                        iconCls: 'x-fa fa-print',
                        tooltip: 'Preview query Letter',
                        action: 'preview_query',
                        handler: 'showPreviewCAPAQueryLetter',
                        stores: '[]',
                        // hidden: true
                    },  {
                        text: 'Close CAPA',
                        iconCls: 'x-fa fa-check',
                        table_name: 'checklistitems_queries',
                        storeID: 'applicationqueriesstr',
                        action: 'close_query',
                        action_url: 'api/closeApplicationCAPA',
                        handler: 'closeApplicationCAPAREquest',
                        hidden: true
                    },];
            }
        }
    },
    columns: [{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'query_ref',
        text: 'CAPA Request Ref',
        width: 100,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'checklist_category',
        hidden: true,
        text: 'CAPA Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'query_type',
        text: 'CAPA Type', hidden: true,
        width: 100,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comments',
        text: 'CAPA Remarks',
        tdCls: 'wrap'
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'queried_by',
        text: 'Raised By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'queried_on',
        text: 'Raised On',
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
                is_manager_query = grid.down('hiddenfield[name=is_manager_query]').getValue();

            if ((is_manager_query) && is_manager_query > 0) {
                if (status === 1 || status == 1) {//open
                    
                        widget.down('menu menuitem[action=close_query]').setVisible(true);
                    
                }
                if (status === 2 || status == 2) {//responded
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                    widget.down('menu menuitem[action=preview_query]').setVisible(false);
                }
                if (status == 4 || status === 4) {//closed
                    widget.down('menu menuitem[action=close_query]').setVisible(false);
                    widget.down('menu menuitem[action=preview_query]').setVisible(false);
                
                }
            } else {
                if (status === 1 || status == 1) {//open
                    widget.down('menu menuitem[action=edit]').setVisible(true);
                    widget.down('menu menuitem[action=preview_query]').setVisible(true);
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                }
                if (status === 2 || status == 2) {//responded
                    widget.down('menu menuitem[action=close_query]').setVisible(true);
                    widget.down('menu menuitem[action=edit]').setVisible(false);
                }
                
                if (status == 4 || status === 4) {//closed
                    widget.down('menu menuitem[action=edit]').setVisible(false);
                    widget.down('menu menuitem[action=close_query]').setVisible(false);
                }
            }
        }
    }]
});
