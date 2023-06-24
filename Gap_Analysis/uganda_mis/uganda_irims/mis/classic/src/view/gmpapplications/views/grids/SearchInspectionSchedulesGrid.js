/**
 * Created by Kip on 1/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.SearchInspectionSchedulesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'searchinspectionschedulesgrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
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
    },{
        xtype:'hiddenfield',
        name:'section_id'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Inspection Schedules',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'inspectionschedulesstr',
                proxy: {
                    url: 'gmpapplications/getGmpScheduleTeamDetails'
                }
            },
            isLoad: true
        },

    },
    tbar:[{
        text:'Double Click to Select Inspection Schedule'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inspectionteam_name',
        text: 'Team Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspectionteam_desc',
        text: 'Team Description',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspectioncountry_list',
        text: 'Inspection Country(ies)',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'start_date',
        text: 'Start Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },]
});
