Ext.define('Admin.view.premiseregistration.views.grids.OnlinePromoAdvertsCosmeticsAppGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'promotionmaterialviewcontroller',
    xtype: 'onlinepromoadvertscosmeticsappgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    isReadOnly: 1,
    isRejection: 0,
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
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        labelWidth: 80,
        width: 320,
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
                            module_id: 14
                        }
                    }
                },
                isLoad: true
            },
            change: function () {
                var grid = this.up('grid');
                grid.getStore().load();
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
    }, {
        xtype: 'tbspacer',
        width: 10
    }, {
        xtype: 'displayfield',
        value: 'Double click to preview',
        fieldStyle: {
            'font-weight': 'bold',
            'color': 'green'
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Online Promotion advertisement applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Sub Module: {[values.rows[0].data.sub_module_name]} [{rows.length} {[values.rows.length > 1 ? "Applications" : "Application"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setPromotionMaterialOnlineGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'onlinepromotionadvertsfoodapplicationstr',
				params:{'section_id':3,'sub_module_id':33},
                groupField: 'sub_module_id',
                proxy: {
                    url: 'promotionmaterials/getPromoAdvertsOnlineApplications'
                }
            },
            isLoad: true
        },
        //itemdblclick:'onDoubleClickPromotionAdvertOnlineAppGrid' //'previewOnlineApplication'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        text: 'Process',
        flex: 1,
        hidden: true,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'promiton Materials',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submission_date',
        text: 'Submitted On',
        flex: 1,
        tdCls: 'wrap',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    },{
        xtype: 'gridcolumn',
        dataIndex: 'manager_rejection_remark',
        text: 'Manager Comments',
        flex: 1,
        tdCls: 'wrap'
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        hidden: true,
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
                    text: 'Preview Application',
                    iconCls: 'x-fa fa-newspaper-o',
                    handler: 'previewOnlineApplication',
                    action: 'preview_app',
                    isReadOnly: 1,
                    stores: '[]'
                }, {
                    text: 'Receive Application',
                    iconCls: 'x-fa fa-thumbs-up',
                    handler: 'receiveOnlineApplicationDetails',
                    storeID: 'onlinepremregistrationstr',
                    winWidth: '50%',
                    action: 'receive_app',
                    stores: '[]',
                    hidden: true
                }, {
                    text: 'Query Application',
                    iconCls: 'x-fa fa-sliders',
                    handler: 'queryOnlineApplication',
                    action: 'query_app',
                    stores: '[]',
                    hidden: true
                }, {
                    text: 'Reject Application',
                    iconCls: 'x-fa fa-thumbs-down',
                    handler: 'submitRejectedOnlineApplication',
                    action: 'reject_app',
                    stores: '[]',
                    hidden: true
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var status = rec.get('application_status_id');
            if (status === 17 || status == 17) {//Queried
                widget.down('menu menuitem[action=query_app]').setText('Queries');
            } else {
                widget.down('menu menuitem[action=query_app]').setText('Query Application');
            }
        }
    }]
});
