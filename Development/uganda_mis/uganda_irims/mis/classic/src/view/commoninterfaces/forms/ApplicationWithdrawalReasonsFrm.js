/**
 * Created by Softclans on 5/21/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationWithdrawalReasonsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationwithdrawalreasonsfrm',
    controller: 'commoninterfacesVctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults:{
        labelAlign: 'top',
        columnWidth: 1,
        margin: 4
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'module_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Reason/Withdrawal Category',
            name: 'withdrawal_category_id',
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_withdrawal_categories'
                            }
                        }
                    },
                    isLoad: false
                },
                afterrender: function(){
                    var store=this.getStore(),
                        form=this.up('form'),
                        module_id=form.down('hiddenfield[name=module_id]').getValue(),
                        filters = {module_id:module_id},
                        filters = JSON.stringify(filters);
                    store.removeAll();
                    store.load({params:{filters:filters} });
                }
            }
        },
        {
            xtype: 'textarea',
            name: 'reason_for_withdrawal',
            fieldLabel: 'Remark'
        }
    ],
    buttons:[
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            action_url: 'api/saveApplicationWithdrawalReasons',
            handler: 'doCreateCommonParamWin',
            storeID: 'applicationwithdrawalreasonsstr',
            table_name: 'tra_application_withdrawaldetails'
        }
    ]
});