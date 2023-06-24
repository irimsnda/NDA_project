/**
 * Created by Kip on 11/10/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisePersonnelDetailsWinGrid', {
    extend: 'Admin.view.premiseregistration.views.grids.PremisePersonnelDetailsAbstractGrid',
    xtype: 'premisepersonneldetailswingrid',

    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'button',
        text: 'Add Personnel',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_personnel',
        winTitle: 'Premises Personnel Details',
        childXtype: 'premisepersonneldetailsfrm',
        handler: 'showAddPremisePersonnelDetailsWin',
        winWidth: '60%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                tabPnl = grid.up('tabpanel'),
                premise_id = tabPnl.down('premisedetailsfrm').down('hiddenfield[name=premise_id]').getValue();
            store.getProxy().extraParams = {
                premise_id: premise_id
            };
        }
    }],
    listeners: {
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_personnel]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Personnel Details',
                        iconCls: 'x-fa fa-user',
                        winTitle: 'Premise Directors Details',
                        childXtype: 'personneldetailstabpnl',
                        winWidth: '60%',
                        handler: 'showEditPremisePersonnelDetailsWin',
                        stores: '[]'
                    }];
            } else {
                add_btn.setVisible(true);
                widgetCol.widget.menu.items = [{
                    text: 'Personnel Details',
                    iconCls: 'x-fa fa-user',
                    winTitle: 'Premise Directors Details',
                    childXtype: 'personneldetailstabpnl',
                    winWidth: '60%',
                    handler: 'showEditPremisePersonnelDetailsWin',
                    stores: '[]'
                }, {
                    text: 'Remove',
                    iconCls: 'x-fa fa-remove',
                    table_name: 'tra_premises_personnel',
                    storeID: 'premisepersonneldetailsstr',
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseOtherDetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [{
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
                items: []
            }
        }
    }]
});