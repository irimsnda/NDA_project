/**
 * Created by Kip on 6/29/2019.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseManagerQueryResponseGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ManagerQueryAbstractGrid',
    controller: 'premiseregistrationvctr',
    xtype: 'premisemanagerqueryresponsegrid',
    autoScroll: true,
    autoHeight: true,
    is_manager_query: 0,
    is_manager_query_response: 1,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        enableTextSelection: true,
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
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
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    table_name: 'tra_premises_applications',
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
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'premiseregistration/getManagerApplicationsGeneric'
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
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'application_status',
            text: 'Status',
            flex: 1
        },
        {
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
                            text: 'Queries',
                            iconCls: 'x-fa fa-cubes',
                            handler: 'showApplicationQueries',
                            childXtype: 'allqueryresponsesgrid'
                        },
                        {
                            text: 'Checklists',
                            iconCls: 'x-fa fa-check-square',
                            handler: 'showApplicationChecklists'
                        },
                        {
                            text: 'Reports',
                            iconCls: 'x-fa fa-exchange',
                            menu: {
                                xtype: 'menu',
                                items: [
                                    {
                                        text: 'Inspection',
                                        iconCls: 'x-fa fa-clipboard',
                                        action: 'inspection_report',
                                        handler: 'printManagersReport',
                                        report_type: 'manager_evaluation'
                                    },
                                    {
                                        text: 'Evaluation',
                                        iconCls: 'x-fa fa-clipboard',
                                        action: 'inspection_report',
                                        handler: 'printManagersReport',
                                        report_type: 'manager_evaluation'
                                    }
                                ]
                            }
                        },
                        {
                            text: 'Preview Details',
                            iconCls: 'x-fa fa-bars',
                            appDetailsReadOnly: 1,
                            handler: 'showPremApplicationMoreDetails'
                        },
                        {
                            text: 'Compare Details',
                            iconCls: 'x-fa fa-bars',
                            appDetailsReadOnly: 1,
                            handler: 'comparePremiseApplicationDetails'
                        },
                        {
                            text: 'Dismiss/Cancel Application',
                            iconCls: 'x-fa fa-thumbs-down',
                            handler: 'showApplicationDismissalForm'
                        }
                    ]
                }
            }
        }]
});
