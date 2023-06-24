/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpInspectionSchedulingPhysicalGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.GmpManagersAbstractGrid',
    xtype: 'gmpinspectionschedulingphysicalgrid',
    selModel: {
        selType: 'checkboxmodel'
    },
    features:[
        {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: '{[values.rows[0].data.inspection_details]} [{rows.length}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],
    tbar: [{
        xtype: 'button',
        text: 'Inspection Schedules',
        ui: 'soft-green',
        childXtype: 'inspectionscheduleselectiongrid',
        winTitle: 'Inspection Schedules',
        winWidth: '65%',hidden: true,
        name: 'inspection_schedule',
        is_assign: 0
    },{
        xtype: 'button',
        text: 'Assign Schedule',
        ui: 'soft-green',
        disabled: true,
        name: 'assign_schedule',
        childXtype: 'inspectionscheduleselectiongrid',
        winTitle: 'Inspection Schedules',
        winWidth: '65%',
        is_assign: 1
    }],
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
                    inspection_type_id: 1,
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
                    gmp_inspection_type: 1,
                    gridXtype: 'gmpinspectionschedulingphysicalgrid'
                }
            ]
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'inspection_id',
                proxy: {
                    url: 'gmpapplications/getGmpInspectionSchedulingApplications'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
                grid.down('button[name=assign_schedule]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
                grid.down('button[name=assign_schedule]').setDisabled(true);
            }
        }
    },
    columns:[
        {
            xtype: 'gridcolumn',
            text: 'Schedule',
            dataIndex: 'inspectionteam_name',
            flex: 1
        }
    ]
});