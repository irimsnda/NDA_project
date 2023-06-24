/**
 * Created by Kip on 5/22/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpWithdrawalCommunicationsGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.GmpManagersAbstractGrid',
    xtype: 'gmpwithdrawalcommunicationsgrid',
    selModel: {
        selType: 'checkboxmodel'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: false,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_gmp_applications',
                    inspection_type_id: 2,
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    action: 'process_submission_btn',
                    winWidth: '50%',
                    gridXtype: 'gmpinspectionschedulingdeskreviewgrid',
                    gmp_inspection_type: 2
                }
            ]
        }
    ],
    plugins: [{
        ptype: 'gridexporter'
    }],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'gmpapplications/getGmpWithdrawalApplicationsAtApproval'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
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
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'approval_status',
        text: 'Approval Recommendation',
        flex: 1
    },        {
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
                items: [
                    {
                        text: 'Print',
                        iconCls: 'x-fa fa-print',
                        name: 'print',
                        menu: {
                            xtype: 'menu',
                            items: [
                                
                                {
                                    text: ' Letter Or Notification',
                                    iconCls: 'x-fa fa-certificate',
                                    name: 'approval_letter',
                                    handler: 'printGmpApprovalLetter'
                                },
                                
                            ]
                        }
                    },
                   
                    {
                        text: 'Update Signatory',
                        iconCls: 'x-fa fa-pencil',
                        stores: '["gmpapprovaldecisionsstr"]',
                        table_name: 'tra_gmp_applications',
                        is_update: 1,
                        handler: 'getApplicationApprovalDetails',
                        hidden: true
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 0,
                        handler: 'showGmpApplicationMoreDetails'
                    }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var gmp_type = rec.get('gmp_type_id');
            if (gmp_type === 1 || gmp_type == 1) {//Oversea
                widget.down('menu menuitem[name=print] menu menuitem[name=premise_cert]').setVisible(false);
                widget.down('menu menuitem[name=print] menu menuitem[name=permit]').setVisible(false);

            }
        }
    }]
});