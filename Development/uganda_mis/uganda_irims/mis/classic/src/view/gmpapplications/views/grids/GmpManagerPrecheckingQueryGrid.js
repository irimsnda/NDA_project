/**
 * Created by Kip on 7/2/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpManagerPrecheckingQueryGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ManagerQueryAbstractGrid',
    xtype: 'gmpmanagerprecheckingquerygrid',
    is_manager_query: 1,
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'gmpapplications/getManagerApplicationsGeneric'
                }
            },
            isLoad: true
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }, {
        xtype: 'combo',
        fieldLabel: 'GMP Type',
        valueField: 'id',
        name: 'gmp_type_id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        width: 300,
        labelWidth: 70,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setGmpApplicationCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'GmpType'
                        }
                    }
                },
                isLoad: true
            },
            change: 'reloadParentGridOnChange'
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
        xtype: 'tbspacer'
    }, {
        xtype: 'displayfield',
        value: 'Only single selection allowed',
        hidden: true,
        fieldStyle: {
            'color': 'red',
            'font-weight': 'bold'
        }
    }],
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
                    table_name: 'tra_gmp_applications',
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
                    table_name: 'tra_gmp_applications',
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'gmp_type_txt',
        text: 'GMP Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
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
                items: [
                    {
                        text: 'Queries',
                        iconCls: 'x-fa fa-cubes',
                        handler: 'showApplicationQueries'
                    },
                    {
                        text: 'Checklists',
                        iconCls: 'x-fa fa-check-square',
                        hidden:true,
                        handler: 'showApplicationChecklists'
                    },{
                        text: 'Application Documents',
                        iconCls: 'x-fa fa-file',
                        tooltip: 'Application Documents',
                        action: 'edit',
                        childXtype: '',
                        winTitle: 'Application Documents',
                        winWidth: '40%',
                        isReadOnly: 1,
                        document_type_id: '',
                        handler: 'showPreviousUploadedDocs'
                    }, 
                    {
                        text: 'Inspection Report',
                        iconCls: 'x-fa fa-exchange',
                        handler: 'printManagersReport',   hidden:true,
                        report_type: 'manager_evaluation'
                    },
                    {
                        text: 'Preview Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showGmpApplicationMoreDetails'
                    },
                    {
                        text: 'Compare Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,   hidden:true,
                        handler: 'compareGmpApplicationDetails'
                    },
                    {
                        text: 'Dismiss/Cancel Application',
                        iconCls: 'x-fa fa-thumbs-down',   hidden:true,
                        handler: 'showApplicationDismissalForm'
                    }
                ]
            }
        }
    }]
});