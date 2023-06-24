/**
 * Created by Kip on 1/25/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.common_grids.ProductParmeetingParticipantsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productParmeetingParticipantsGrid',
    controller: 'productregistrationvctr',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: true
    },
    frame: true,
    height: 500,
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'parmeetingparticipantsstr',
                proxy: {
                    url: 'usermanagement/getActiveSystemUsers'
                   
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=save_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=save_selected]').setDisabled(true);
            }
        }
    },
	features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    tbar: [
        {
            xtype: 'button',
            text: 'External Participant',
            ui: 'soft-green',
            iconCls: 'x-fa fa-plus',
            handler: 'showAddTcMeetingExternalParticipant',
            childXtype: 'meetingparticipantsfrm',
            winTitle: 'Meeting Participant',
            winWidth: '40%',
            stores: '[]'
        },
        {
            xtype: 'button',
            text: 'Save Selected',
            ui: 'soft-green',
            iconCls: 'x-fa fa-save',
            disabled: true,
            name: 'save_selected'
        },
        {
            xtype: 'hiddenfield',
            name: 'meeting_id'
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true
        }
    ],
    columns: [
        {
            text: 'Participant Name',
            dataIndex: 'fullnames',
            flex: 1
        },
        {
            text: 'Phone No',
            dataIndex: 'phone',
            flex: 1
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 1
        }
    ]
});