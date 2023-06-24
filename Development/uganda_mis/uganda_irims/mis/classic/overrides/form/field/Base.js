/**
 * Created by Kip on 5/16/2019.
 */
Ext.define('Admin.overrides.form.field.Base', {
    override: 'Ext.form.field.Base',
    initComponent : function()
    {
        if(this.allowBlank!==undefined && !this.allowBlank)
        {
            if(!this.labelSeparator)
            {
                this.labelSeparator = "";
            }
            this.labelSeparator += ' <span style="color:red">*</span>';
        }
        this.callParent(arguments);
    }
});