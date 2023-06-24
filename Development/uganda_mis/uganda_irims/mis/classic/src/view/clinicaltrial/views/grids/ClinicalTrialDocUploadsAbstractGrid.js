/**
 * Created by Kip on 1/24/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialDocUploadsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'clinicaltrialdocuploadsabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
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
                dataIndex: 'applicant_name',
                text: 'File Name',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'study_title',
                text: 'Upload Date',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'sponsor',
                text: 'Comments',
                flex: 1
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
