/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistrySecondaryIdsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistrysecondaryidsfrm',
    layout: 'column',
    defaults: {
        
        columnWidth: 1,
        margin: 5,
        labelAlign: 'top',
        allowBlank: true
    },
    autoScroll: true,
    bodyPadding: 5,
    listeners: {
        afterrender: function () {
        
             /*
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
            */
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly',
            value:0
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Is Secondary Id applicable for this trial??',
            name: 'is_secondaryid_applicable',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'displayfield',
            value:"Secondary ID: If applicable please enter any additional identifying numbers assigned by other issuing authorities. For example Sponsor-issued trial/protocol number, unique id numbers issued by other trial registers, ID's issued by regulatory authorities or ethics committees. ",
           
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '14px'
                }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Secondary IDs ',
            name: 'secondary_id',
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Issuing Authority/ Trial register',
            name: 'issuing_authority'
        }
    ]
});