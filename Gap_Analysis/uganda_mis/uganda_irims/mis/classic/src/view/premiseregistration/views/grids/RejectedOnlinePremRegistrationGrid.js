/**
 * Created by Kip on 4/27/2019.
 */
Ext.define('Admin.view.premiseregistration.views.grids.RejectedOnlinePremRegistrationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'rejectedonlinepremregistrationgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    isReadOnly: 1,
    isRejection: 1,
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
                            module_id: 2
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
    export_title: 'Online premise applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        application_status: 23,
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
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'rejectedonlinepremregistrationstr',
                groupField: 'sub_module_id',
                proxy: {
                    url: 'premiseregistration/getOnlineApplications'
                }
            },
            isLoad: true
        },
        itemdblclick: 'previewOnlineApplication'
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
        text: 'Premise',
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'rejection_reason',
        text: 'Rejection Reason',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'rejection_remark',
        text: 'Rejection Remarks',
        tdCls: 'wrap',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'rejection_date',
        text: 'Rejection Date',
        tdCls: 'wrap',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
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
                    text: 'Previous Rejection Reasons',
                    iconCls: 'x-fa fa-thumbs-up',
                    handler: 'receiveOnlineApplicationDetails',
                    storeID: 'onlinepremregistrationstr',
                    winWidth: '50%',
                    action: 'receive_app',
                    stores: '[]'
                }
                ]
            }
        }
    }]
});
