/**
 * Created by Kip on 3/20/2019.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisePersonnelDetailsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premisepersonneldetailsabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Premise Personnel Details',
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'premisepersonneldetailsstr',
                proxy: {
                    url: 'premiseregistration/getPremisePersonnelDetails'
                }
            },
            isLoad: true
        }
    },
    initComponent: function () {
        var defaultColumns = [{
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Name',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'telephone_no',
            text: 'Telephone No',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'email_address',
            text: 'Email address',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'postal_address',
            text: 'Postal Address',
            flex: 1,
            hidden: true
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'qualification_combined',
            text: 'Qualification',
            flex: 1,
            tdCls: 'wrap'
        }, {
            xtype: 'datecolumn',
            dataIndex: 'start_date',
            text: 'Start Date',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        }, {
            xtype: 'datecolumn',
            dataIndex: 'end_date',
            text: 'End Date',
            flex: 1,
            renderer: Ext.util.Format.dateRenderer('d/m/Y')
        }];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
