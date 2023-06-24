/**
 * Created by Softclans on 1/12/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.InspectionSchedulesAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'inspectionschedulesabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    initComponent: function () {
        var defaultColumns = [
            {
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
                text: 'Scheduled Start Date',
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'end_date',
                text: 'Scheduled End Date',
                flex: 1,
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
